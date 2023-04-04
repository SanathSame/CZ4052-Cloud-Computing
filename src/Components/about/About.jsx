import React from 'react'
import Back from '../common/back/Back'
import AboutCard from './AboutCard'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'

const About = () => {
  return (
    <>
        <Header/>
        <Back title='Contribute' /> 
        <AboutCard />
        <Footer/>
    </>
  )
}

export default About