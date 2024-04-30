import React from 'react'
import Layout from 'ClientPanel/layout/Layout'
import ProfileHeader from 'ClientPanel/components/Profile/ProfileHeader'
import ProfileBody from 'ClientPanel/components/Profile/ProfileBody'
import { useFetch } from 'ClientPanel/utils/FetchContext'


const Profile = () => {

  const {userData} = useFetch();

  return (
    <Layout>
      <ProfileHeader firstName={userData.first_name} userType={userData.user_type}/>
      <ProfileBody />
    </Layout>
  )
}

export default Profile