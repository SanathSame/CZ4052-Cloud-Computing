import React from 'react'
import Back from '../common/back/Back'
import CoursesCard from './CoursesCard'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'

const Learn = () => {
  return (
    <>
    <Header/>
        <Back title='Learn' />
        <CoursesCard />
    <Footer/>
    </>
  )
}

export default Learn