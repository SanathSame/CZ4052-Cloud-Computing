import React from 'react'

const Back = ({ title }) => {

  return (
    <>
      <section className="back">
        <h1 style={{ textShadow: '3px 3px #000000' }}>{title}</h1>
      </section>

      <div className="marigin"></div>
    </>
  )
}

export default Back