import React from 'react'
import Layout from 'ClientPanel/layout/Layout'
import AboutPage from 'ClientPanel/components/About/AboutPage'
import AboutHeader from 'ClientPanel/components/About/AboutHeader'

const About = () => {
  return (
    <Layout>
      <AboutHeader />
      <AboutPage />
    </Layout>
  )
}

export default About