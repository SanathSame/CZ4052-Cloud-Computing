import React from 'react'
import Back from '../common/back/Back'
import './contact.css'
import Header from '../common/heading/Header'
import Footer from '../common/footer/Footer'

const Contribute = () => {

    const handleClick = () => {
        window.location.reload(false);
    }

    return (
        <>
            <Header />
            <Back title="Contribute" />
            <section className="contact padding">
                <div className="container shadow" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="right row">
                        <h1 style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>Contribute to our platform</h1>
                        <form action="">
                            <div className="flexSB">
                                <input type="text" placeholder='Name' />
                                <input type="email" placeholder='Email' />
                            </div>
                            <input type="email" placeholder='Subject' />
                            <textarea cols="30" rows="10">
                                Create a message here...
                            </textarea>
                            <button className="primary-btn" onClick={handleClick}>SEND MESSAGE</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contribute