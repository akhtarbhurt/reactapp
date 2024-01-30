import React from 'react'
import HeroSection from '../components/HeroSection'
import MovieSlider from '../components/MovieSlider'
import TvSlider from '../components/TvSlider'
const Homes = () => {

  return (
    <div>
      <HeroSection/>
      <MovieSlider  title={'Popular Movies'}  />
      <TvSlider  title={"Popular Tv Shows"} />
    </div>
  )
}

export default Homes
