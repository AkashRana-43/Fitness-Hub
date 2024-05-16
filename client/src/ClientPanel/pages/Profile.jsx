import React, {useState} from 'react'
import Layout from 'ClientPanel/layout/Layout'
import ProfileHeader from 'ClientPanel/components/Profile/ProfileHeader'
import ProfileBody from 'ClientPanel/components/Profile/ProfileBody'
import { useFetch } from 'ClientPanel/utils/FetchContext'
import ProfileDescBody from 'ClientPanel/components/Profile/ProfileDescBody'


const Profile = () => {

  const [activeTab, setActiveTab] = useState("profile");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const {userData} = useFetch();

  return (
    <Layout showFooter = {false}>
      <ProfileHeader firstName={userData.first_name} userType={userData.user_type} activeTab={activeTab} onTabChange={handleTabChange}/>
      {activeTab === "profile" ? <ProfileDescBody /> : <ProfileBody />}
    </Layout>
  )
}

export default Profile