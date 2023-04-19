import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

const profile =
{
  cover: "./images/team/hasbulla.jpeg",
  name: "user1",
  work: "Learner",
}



function ProfileCard() {
  const [user, setUserName] = useState('');
  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const { attributes } = await Auth.currentUserInfo();
    let { email } = attributes
    console.log("Details are", email);
    setUserName(email.split('@')[0]);
  }

  return (
    <div className=''>
      <div className="img">
        <img src={profile.cover} alt="" />
      </div>
      <div className="details">
        <h2>Username: {user}</h2>
        <p>Title: {profile.work}</p>
      </div>
    </div>
  );
}

export default ProfileCard;