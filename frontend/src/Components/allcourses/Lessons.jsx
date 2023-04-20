import React, { useState, useEffect } from "react";
import Header from "../common/heading/Header";
import Footer from "../common/footer/Footer";
import "./videos.css";
import Back from "../common/back/Back";
import { Storage } from "aws-amplify";
import { Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { words } from "../../dummydata";

function Lessons({ CDN_URL }) {
    const [showVideo, setShowVideo] = useState(false);
    const [letter, setLetter] = useState("");
    const navigate = useNavigate();
    const wordList = words;
    const handleWatchClick = (letter) => {
        setLetter(letter);
        setShowVideo(true);
    };
    const handleCloseClick = () => {
        // setLetter("");
        setShowVideo(false);
    };
    const [isVideoWatched, setIsVideoWatched] = useState(false);

    function handleWatchComplete() {
        setIsVideoWatched(true);
    }

    function handleAttemptQuiz(letter) {
        // handle quiz attempt
        console.log('Letter is', letter)
        navigate('/quizzes#:~:text=Submit-,' + { letter } + ',-Submit')
    }


    const content = sessionStorage.getItem('Lesson');
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
        console.log('Letters are', cardLetter);
        const letterURLs = data.filter((x) =>
            x["key"].includes("/" + cardLetter.toLowerCase() + "/")
        );
        // console.log(letterURLs);
        const URL =
            videoUrl +
            letterURLs[Math.floor(Math.random() * letterURLs.length)]["key"];
        return (
            <>
                <div className="col" class={{ border: "2px black solid" }}>
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
                                <Button onClick={() => handleWatchClick(cardLetter)}>
                                    Watch
                                </Button>
                            </div>
                        </div>
                    </div>
                    {showVideo && cardLetter === letter && (
                        <div className="video-popup" onClick={() => handleCloseClick()}>
                            <div className="video-popup-overlay" />
                            <div className="video-popup-content">
                                <video src={URL} controls onEnded={handleWatchComplete} />
                                {isVideoWatched && (
                                    <button>Attempt Quiz</button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    };
    const WordCard = (props) => {
        console.log('word is', props.cardWord);
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
                                {props.cardWord}
                            </h5>
                            <div className="d-grid">
                                <Button onClick={() => handleWatchClick(props.cardWord)}>
                                    Watch
                                </Button>
                            </div>
                        </div>
                    </div>
                    {showVideo && props.cardWord === letter && (
                        <div className="video-popup" onClick={handleCloseClick}>
                            <div className="video-popup-overlay" />
                            <div className="video-popup-content">
                                <video src={props.cardWord === 'Butterfly' ? `${process.env.PUBLIC_URL}/butterfly.mp4` : URL} controls onEnded={handleWatchComplete} />
                                {isVideoWatched && (
                                    <div>
                                        <Button onClick={() => handleAttemptQuiz(props.cardWord)}>Attempt Quiz</Button>
                                    </div>
                                )}
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
            {content === 'letters' ? (
                <>
                    <Header />
                    <Back title="Learning English Letters" />
                    <div className="lessons-page">
                        <div className="d-flex justify-content-around flex-wrap">
                            {data.length && letters.map((letter) => <div className="my-3"><LessonCard cardLetter={letter} videoUrl={CDN_URL} /> </div>)}
                        </div>
                    </div>
                    <Footer />
                </>
            ) : (
                <>
                    <Header />
                    <Back title="Learning English Words" />
                    <div className="lessons-page">
                        <div className="d-flex justify-content-around flex-wrap">
                            {data.length && wordList.map((word) => <div className="my-3"><WordCard cardWord={word} videoUrl={CDN_URL} /> </div>)}
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}

export default Lessons;
