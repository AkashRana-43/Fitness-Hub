import React from 'react'
import Layout from 'ClientPanel/layout/Layout'
import ProfileHeader from 'ClientPanel/components/Profile/ProfileHeader'
import ProfileBody from 'ClientPanel/components/Profile/ProfileBody'

const Profile = () => {
  return (
    <Layout>
      <ProfileHeader />
      <ProfileBody />
    </Layout>
  )
}

export default Profile