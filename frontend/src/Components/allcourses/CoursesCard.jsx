import React from "react";
import { coursesCard } from "../../dummydata";
import "./courses.css";
import { Link } from "react-router-dom";

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
                  <img src="/public/images/Course1.jpg" alt="Letter" />
                </div>
                <Link to="/lesson">
                  <button className="outline-btn">LEARN</button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CoursesCard;
