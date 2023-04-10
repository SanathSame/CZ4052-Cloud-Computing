import React from 'react'
import Title from '../../common/title/Title'
import './hero.css';
import { useNavigate } from 'react-router-dom'




function Hero() {
  const navigate = useNavigate()

  function handleLogin() {
    navigate('/login');

  }
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <Title subtitle="Learning ASL has never been easier!" title="WELCOME TO SIGNSENSEI" />
            <p>Learn sign language online with our interactive video lessons. Our expert instructors provide a comprehensive and user-friendly approach to mastering sign language grammar, syntax, and vocabulary. Access flexible learning options and a wealth of resources, including a dictionary and phrasebook. Join our community of passionate learners today!</p>
            <div className="button">
              <button className="primary-btn" onClick={handleLogin}>LOGIN<i className='fa fa-long-arrow-alt-right'></i></button>
              <button style={{ marginLeft: '10px' }}>SIGN UP<i className='fa fa-long-arrow-alt-right'></i></button>
            </div>
          </div>
        </div>
      </section>

      <div className="marigin"></div>
    </>
  );
}

export default Hero