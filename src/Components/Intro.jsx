import React from 'react'
import hero from '../assets/hero.png'
function Intro() {
  return (
    <div>

      <div className="max-w-3xl mx-auto text-center mt-12">
        <img src={hero} className='h-44 mx-auto' alt="" />
        <h1 className="text-4xl text-neutral-800 font-black mt-4">Organize your work and life, effortlessly.</h1>
        <p className='mt-2 text-neutral-600'>Whether it’s personal goals, work tasks, or daily errands, Planit keeps everything in one place to help you stay focused and productive.</p>
      </div>
     
    </div>
  )
}

export default Intro