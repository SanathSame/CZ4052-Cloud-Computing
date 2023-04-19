import React from "react";
import { coursesCard } from "../../dummydata";
import "./courses.css";
import { Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
function CoursesCard() {
  const navigate = useNavigate();

  function handleLessons(courseName) {
    let course = '';
    if (courseName.includes('Letters')) {
      course = 'letters';
    } else if (courseName.includes('Words')) {
      course = 'words';
    }
    sessionStorage.setItem('Lesson', course);
    navigate('/lessons');
  }
  return (
    <>
      <section className="coursesCard">
        <div className="container grid2">
          {coursesCard.map((val) => {
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
                <div className="price">
                </div>
                <Button onClick={() => handleLessons(val.coursesName)}>LEARN</Button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default CoursesCard;
