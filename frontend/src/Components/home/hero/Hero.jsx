import React from "react";
import Title from "../../common/title/Title";
import "./hero.css";
import { Link } from "react-router-dom";


function Hero() {

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <Title
              subtitle="Learning ASL has never been easier!"
              title="WELCOME TO SIGNSENSEI"
            />
            <p>
              Learn sign language online with our interactive video lessons. Our
              expert instructors provide a comprehensive and user-friendly
              approach to mastering sign language grammar, syntax, and
              vocabulary. Access flexible learning options and a wealth of
              resources, including a dictionary and phrasebook. Join our
              community of passionate learners today!
            </p>
            <Link to="/login">
              <button>
                GET STARTED <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
