import React, { useState } from "react";
import Header from "../common/heading/Header";
import Footer from "../common/footer/Footer";
import "./videos.css";
import Back from "../common/back/Back";

function Lessons() {
  const [showVideo, setShowVideo] = useState(false);
  const handleWatchClick = () => {
    setShowVideo(true);
  };
  const handleCloseClick = () => {
    setShowVideo(false);
  };

  const LessonCard = ({ letter, videoUrl }) => {
    return (
      <>
        <div className="col">
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
              <h5 className="card-title text-center text-truncate">{letter}</h5>
              <div className="d-grid">
                <button onClick={handleWatchClick}>Watch</button>
              </div>
            </div>
          </div>
          {showVideo && (
            <div className="video-popup">
              <div className="video-popup-overlay" onClick={handleCloseClick} />
              <div className="video-popup-content">
                <button className="close-button" onClick={handleCloseClick}>
                  <i className="fa fa-times" />
                </button>
                <video src={videoUrl} controls />
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      <Back title="Lessons"></Back>
      <div className="lessons-page">
        <h1>ASL Learning Lessons</h1>
        <div
          className={
            "row row-cols-1 row-cols-md-2 row-cols-lg-2 g- mb-4 flex-shrink-0 " +
            "row-cols-xl-3"
          }
        >
          <LessonCard letter="A" videoUrl={`${process.env.PUBLIC_URL}/A.mp4`} />
          <LessonCard letter="B" videoUrl={`${process.env.PUBLIC_URL}/A.mp4`} />
          <LessonCard letter="C" videoUrl={`${process.env.PUBLIC_URL}/A.mp4`} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Lessons;
