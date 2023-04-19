import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth, Storage } from "aws-amplify";
import CircularProgress from "@mui/joy/CircularProgress";

export default function WebcamVideo() {
  const { state } = useLocation();
  const { letter, EC2_URL } = state;
  const navigate = useNavigate();
  console.log(letter);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isUploaded, setisUploaded] = useState(false);

  const handleCloseClick = () => {
    navigate(-1);
  };

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setRecordedChunks([]);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleUpload = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const mediablob = await fetch(url).then((response) => response.blob());
      const filename = letter + "_" + Date.now().toString() + ".mp4";
      console.log(filename);
      const { id } = await Auth.currentUserInfo();
      console.log(id);
      const upload_file = new File([mediablob], filename, {
        type: "video/mp4",
      });
      const S3_key = "protected/" + id + "/" + filename;
      console.log(S3_key);
      console.log(upload_file.type);
      try {
        await Storage.put(upload_file.name, upload_file, {
          level: "protected",
          contentType: upload_file.type,
        });
        setisUploaded(true);
        console.log("Letter attempted is", letter);
        alert("Successful video upload");
      } catch (error) {
        console.error("Upload error:", error);
        setisUploaded(false);
        alert("Error uploading video, try recording again");
      }
      setRecordedChunks([]);
      try {
        setIsLoading(true);
        const response = await fetch(EC2_URL + "/predict?S3_key=" + S3_key);
        const result = await response.json();
        console.log(result["prediction_class"]);
        setIsLoading(false);
        setPrediction(result["prediction_class"]);
        sessionStorage.setItem("letter", letter);
        sessionStorage.setItem("prediction", result["prediction_class"]);
      } catch (error) {
        console.error("Prediction error:", error);
        alert("Error retrieving prediction, try recording again");
        setIsLoading(false);
        setPrediction("");
      }
    }
  }, [recordedChunks, letter, EC2_URL]);

  const handleDownload = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    width: 800,
    height: 600,
    facingMode: "user",
  };

  return !isUploaded ? (
    <div className="video-popup">
      <div className="video-popup-overlay" onClick={handleCloseClick} />
      <div className="video-popup-content">
        <Webcam
          height={600}
          width={800}
          audio={false}
          mirrored={true}
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <div className="cpi">
              <CircularProgress
                determinate={false}
                size="md"
                value={20}
                variant="plain"
              />
              {"Retrieving Predictions, Please wait!"}
            </div>
          ) : capturing ? (
            <button onClick={handleStopCaptureClick}>Stop Capture</button>
          ) : prediction === "" ? (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
          ) : (
            <h1>Prediction is {prediction}</h1>
          )}
          {recordedChunks.length > 0 && (
            <div>
              <button onClick={handleUpload}>Upload</button>
              <button onClick={handleDownload}>Download</button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    navigate("/quizzes")
  );
}
