import React from 'react'
import Layout from '../components/Layout'
import Poster from '../components/Poster'
import bgImg from '../assets/BG.jpg'

const Home = () => {
  return (
    <Layout>
      <Poster 
        cName='poster'
        posterImg={bgImg}
        title='No Pain No Gain'
      />
    </Layout>
  )
}

export default Home