import React from "react";
import { Link } from "react-router-dom";
import { coursesCard } from "../../dummydata";
import "./courses.css";
import { Button } from "@aws-amplify/ui-react";

const CoursesCard = () => {
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
                <Link to="/lessons"><Button>LEARN</Button></Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CoursesCard;
