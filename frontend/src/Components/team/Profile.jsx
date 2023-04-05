import React from 'react'
import Back from '../common/back/Back'
import TeamCard from './TeamCard'
import "./team.css"
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'

const Team = () => {
  return (
    <>
    <Header/>
        <Back title="Profile" />
        <section className="team padding">
            <div className="container grid" style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
                <TeamCard />
            </div>
        </section>
      <Footer/>
    </>
  )
}

export default Team