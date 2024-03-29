import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/heading/Header";
import Footer from "../common/footer/Footer";
import "./videos.css";
import Back from "../common/back/Back";
import CircularProgress from "@mui/joy/CircularProgress";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { words } from "../../dummydata";

function Quizzes({ EC2_URL }) {
  const navigate = useNavigate();
  const handleSubmit = (cardLetter) => {
    navigate("/record-video", {
      state: { letter: cardLetter, EC2_URL: EC2_URL },
    });
  };
  const content = sessionStorage.getItem("Quiz Topic");

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

  const letter = sessionStorage.getItem("letter");
  const prediction = sessionStorage.getItem("prediction");

  const LetterQuizCard = ({ cardLetter }) => {
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
                {letter === null ? (
                  <button onClick={() => handleSubmit(cardLetter)}>
                    Submit
                  </button>
                ) : letter === cardLetter && prediction ? (
                  prediction === cardLetter ? (
                    <div className="card-title text-center text-truncate">
                      <DoneIcon color="success" />
                    </div>
                  ) : (
                    <div className="card-title text-center text-truncate">
                      <DangerousIcon color="warning" />
                    </div>
                  )
                ) : letter === cardLetter && !prediction ? (
                  <div className="cpi">
                    <CircularProgress
                      determinate={false}
                      size="md"
                      value={20}
                      variant="plain"
                    />{" "}
                  </div>
                ) : (
                  <button onClick={() => handleSubmit(cardLetter)}>
                    Submit
                  </button>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const WordQuizCard = ({ cardLetter }) => {
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
                {letter === null ? (
                  <button onClick={() => handleSubmit(cardLetter)}>
                    Submit
                  </button>
                ) : letter === cardLetter && prediction ? (
                  prediction === cardLetter ? (
                    <div className="card-title text-center text-truncate">
                      <DoneIcon color="success" />
                    </div>
                  ) : (
                    <div className="card-title text-center text-truncate">
                      <DangerousIcon color="warning" />
                    </div>
                  )
                ) : letter === cardLetter && !prediction ? (
                  <div className="cpi">
                    <CircularProgress
                      determinate={false}
                      size="md"
                      value={20}
                      variant="plain"
                    />{" "}
                  </div>
                ) : (
                  <button onClick={() => handleSubmit(cardLetter)}>
                    Submit
                  </button>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return content === "letters" ? (
    <>
      <Header />
      <Back title="Letters Quiz"></Back>
      <div className="quizzes-page">
        <h1>ASL Learning Quizzes</h1>
        <div class="d-flex justify-content-around flex-wrap">
          {letters.map((letter) => {
            return <LetterQuizCard cardLetter={letter} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <>
      <Header />
      <Back title="Word Quiz"></Back>
      <div className="quizzes-page">
        <h1>ASL Learning Quizzes</h1>
        <div class="d-flex justify-content-around flex-wrap">
          {words.map((letter) => {
            return <WordQuizCard cardLetter={letter} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Quizzes;
