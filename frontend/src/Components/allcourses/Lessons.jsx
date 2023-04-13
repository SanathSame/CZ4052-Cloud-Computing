import React, { useState, useEffect } from "react";
import Header from "../common/heading/Header";
import Footer from "../common/footer/Footer";
import "./videos.css";
import Back from "../common/back/Back";
import { Storage } from "aws-amplify";
import { ComponentPropsToStylePropsMapKeys } from "@aws-amplify/ui-react";

function Lessons({ CDN_URL }) {
  const [showVideo, setShowVideo] = useState(false);
  const [letter, setLetter] = useState("");

  const handleWatchClick = (letter) => {
    setLetter(letter);
    setShowVideo(true);
  };
  const handleCloseClick = () => {
    // setLetter("");
    setShowVideo(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch data

    const dataFetch = async () => {
      const { results } = await Storage.list("subdataset/");
      // set state when the data received
      //   console.log(results);
      setData(results);
    };

    dataFetch();
  }, []);

  const letters = [
    ...Array("Z".charCodeAt(0) - "A".charCodeAt(0) + 1).keys(),
  ].map((i) => String.fromCharCode(i + "A".charCodeAt(0)));

  letters.splice(letters.indexOf("C"), 1);
  letters.splice(letters.indexOf("L"), 1);
  letters.splice(letters.indexOf("U"), 1);
  letters.splice(letters.indexOf("V"), 1);
  letters.splice(letters.indexOf("W"), 1);
  letters.splice(letters.indexOf("X"), 1);
  letters.splice(letters.indexOf("Y"), 1);
  letters.splice(letters.indexOf("Z"), 1);

  const LessonCard = ({ cardLetter, videoUrl }) => {
    // console.log(data);
    const letterURLs = data.filter((x) =>
      x["key"].includes("/" + cardLetter.toLowerCase() + "/")
    );
    // console.log(letterURLs);
    const URL =
      videoUrl +
      letterURLs[Math.floor(Math.random() * letterURLs.length)]["key"];
    return (
      <>
        <div className="col" class={{ border: "1px black solid" }}>
          <div className="card shadow-sm">
            <div className="bg-dark cover">
              <img
                className="card-img-top"
                height="200"
                alt=""
                src={`${process.env.PUBLIC_URL}/images/Course1.JPG`} // replace with thumbnail URL
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text-center text-truncate">
                {cardLetter}
              </h5>
              <div className="d-grid">
                <button onClick={() => handleWatchClick(cardLetter)}>
                  Watch
                </button>
              </div>
            </div>
          </div>
          {showVideo && cardLetter === letter && (
            <div className="video-popup">
              <div className="video-popup-overlay" onClick={handleCloseClick} />
              <div className="video-popup-content">
                <video src={URL} controls />
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  console.log(data);

  return (
    <>
      <Header />
      <Back title="Lessons"></Back>
      <div className="lessons-page">
        <h1>ASL Learning Lessons</h1>
        <div class="d-flex justify-content-around flex-wrap">
          {letters.map((letter) => {
            // console.log(CDN_URL);
            return <LessonCard cardLetter={letter} videoUrl={CDN_URL} />;
          })}
          ;
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Lessons;
