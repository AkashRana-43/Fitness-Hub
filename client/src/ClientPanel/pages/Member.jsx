import React from 'react'
import Layout from 'ClientPanel/layout/Layout'
import MembersList from 'ClientPanel/components/Member/MembersList'
import MemberHeader from 'ClientPanel/components/Member/MemberHeader'

const Member = () => {



  return (
    <Layout>
        <MemberHeader />
        <MembersList />
    </Layout>
  )
}

export default Member