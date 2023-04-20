import React from "react";
import Back from "../common/back/Back";
import Header from "../common/heading/Header";
import Footer from "../common/footer/Footer";
import "./quizzes.css";
import { quizzesCard } from "../../dummydata";
import { Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const QuizzesCard = () => {
  const navigate = useNavigate();
  function handleQuizzes(courseName) {
    let course = "";
    if (courseName.includes("Letters")) {
      course = "letters";
    } else if (courseName.includes("Words")) {
      course = "words";
    }
    sessionStorage.setItem("Lesson", course);
    navigate("/quizzes");
  }
  return (
    <>
      <section className="quizzesCard">
        <div className="container grid2">
          {quizzesCard.map((val) => {
            return (
              <div className="items">
                <div className="content flex">
                  <div className="left">
                    <div className="img">
                      <img src={val.cover} alt="" />
                    </div>
                  </div>
                  <div className="text">
                    <h1>{val.coursesName}</h1>
                  </div>
                </div>
                <div className="price"></div>
                <Button onClick={() => handleQuizzes(val.coursesName)}>
                  {" "}
                  Attempt Quiz{" "}
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

const QuizzesHome = () => {
  return (
    <>
      <Header />
      <Back title="Quizzes" />
      <QuizzesCard />
      <Footer />
    </>
  );
};

export default QuizzesHome;
