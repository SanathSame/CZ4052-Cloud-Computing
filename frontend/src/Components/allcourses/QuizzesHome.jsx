import React from 'react'
import Back from '../common/back/Back'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'
import "./quizzes.css";
import { Link } from "react-router-dom";
import { quizzesCard } from "../../dummydata";
import { Button } from "@aws-amplify/ui-react";

const QuizzesCard = () => {
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
                                <div className="price">
                                </div>
                                <Link to="/quizzes"> <Button> Attempt Quiz </Button></Link>
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
            <Back title='Quizzes' />
            <QuizzesCard />
            <Footer />
        </>
    )
}

export default QuizzesHome;