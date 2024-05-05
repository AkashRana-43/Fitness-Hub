import React, {useState} from 'react'
import Layout from 'ClientPanel/layout/Layout'
import MemberList from 'ClientPanel/components/Member/MemberList'
import MemberHeader from 'ClientPanel/components/Member/MemberHeader'
import FriendRequest from 'ClientPanel/components/Member/FriendRequest'

const Member = () => {

  const [activeTab, setActiveTab] = useState("profile");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  return (
    <Layout showFooter = {false}>
        <MemberHeader activeTab={activeTab} onTabChange={handleTabChange} />
        {activeTab === "profile" ? <MemberList/> : <FriendRequest /> }
    </Layout>
  )
}

export default Member