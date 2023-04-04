import React from 'react'

const team = 
    {
      cover: "./images/team/hasbulla.jpeg",
      name: "user1",
      work: "Learner",
    }
  
const TeamCard = () => {
  return (
            <div className=''>
                <div className="img">
                    <img src={team.cover} alt="" />
                </div>
                <div className="details">
                    <h2>Username: {team.name}</h2>
                    <p>Title: {team.work}</p>
                </div>
            </div>
  )
}

export default TeamCard