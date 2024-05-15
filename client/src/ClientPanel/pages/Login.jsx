import React from 'react';
import Layout from 'ClientPanel/layout/Layout';
import LoginForm from 'ClientPanel/components/Forms/LoginForm';
import { useAuth } from 'ClientPanel/utils/AuthContext';

const Login = () => {

  const {handleLogin} = useAuth();

  return (
    <Layout>   
      <LoginForm handleLogin={handleLogin}/>
    </Layout>
  );
};

export default Login;

