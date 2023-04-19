import React from 'react'
import Back from '../common/back/Back'
import ProfileCard from './ProfileCard'
import "./team.css"
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'
const Profile = () => {
  return (
    <>
      <Header />
      <Back title="Profile" />
      <section className="team padding">
        <div className="container grid" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ProfileCard />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Profile