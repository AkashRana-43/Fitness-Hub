import Layout from 'ClientPanel/layout/Layout'
import ProfileId from 'ClientPanel/components/Profile/ProfileId'
import React from 'react'

const ProfilePage = ({ userId }) => {
  return (
    <Layout showFooter = {false}>
        <ProfileId userId={userId}/>
    </Layout>
  )
}

export default ProfilePage