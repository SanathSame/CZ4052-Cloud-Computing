import React from 'react'
import './style.css'
import { testimonal } from '../../../dummydata'
import Title from '../../common/title/Title'

const Test = () => {
  return (
    <>
        <section className="testimonial padding">
            <div className="container">
                <Title subtitle='Testimonial' title='our successful students' />

                <dic className="content grid2">
                    {testimonal.map((val) => (
                        <div className="items shadow">
                            <div className="box flex">
                                <div className="img">
                                    <img src={val.cover} alt="" />
                                    <i className="fa fa-quote-left icon"></i>
                                </div>
                                <div className="name">
                                    <h2>{val.name}</h2>
                                    <span>{val.post}</span>
                                </div>
                            </div>
                            <p>{val.desc}</p>
                        </div>
                    ))}
                </dic>
            </div>
        </section>
    </>
  )
}

export default Test