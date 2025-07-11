import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'

const Home = () => {
    return (
        <div className='dark:bg-slate-900'>
            <Navbar />
            <Hero />
            <AiTools />
            <Testimonial />
        </div>
    )
}

export default Home