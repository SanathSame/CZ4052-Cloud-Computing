import React from 'react'
import Back from '../common/back/Back'
import Faq from './Faq'
import './price.css'
import PriceCard from './PriceCard'

const Price = () => {
  return (
    <>
        <Back title='Choose The Right Plan' />
        <section className="price padding">
            <div className="container grid">
                <PriceCard />   
            </div>
        </section>
        <Faq />
    </>
  )
}

export default Price