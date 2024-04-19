import React from 'react'
import Layout from '../components/Layout'
import Poster from '../components/Poster'
import homeBG from '../assets/HomeBG.jpg'
import Program from '../components/Program'

const Home = () => {
  return (
    <Layout>
      <Poster 
        img={homeBG}
        text='Our platform is to provide you to choose better trainers all over Australia.'
        title='No Pain No Gain'
      />
      <div className='container'>
        <Program />
      </div>
    </Layout>
  )
}

export default Home