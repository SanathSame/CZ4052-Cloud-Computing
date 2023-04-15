import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth, Storage } from "aws-amplify";

export default function WebcamVideo() {
  const { state } = useLocation();
  const { letter } = state;
  const navigate = useNavigate();
  console.log(letter);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

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
      console.log(letter + "_" + Date.now().toString() + ".mp4");
      const { id } = await Auth.currentUserInfo();
      console.log(id);
      const upload_file = new File(
        [mediablob],
        letter + "_" + Date.now().toString() + ".mp4",
        { type: "video/mp4" }
      );
      console.log(upload_file.type);
      Storage.put(upload_file.name, upload_file, {
        level: "protected",
        contentType: upload_file.type,
      });
      setRecordedChunks([]);
    }
  }, [recordedChunks, letter]);

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

  return (
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
        <div>
          {capturing ? (
            <button onClick={handleStopCaptureClick}>Stop Capture</button>
          ) : (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
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
  );
}
