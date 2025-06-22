import { useNavigate } from 'react-router-dom';
import { LoginForm } from './login-form'
import { useAuthStore } from '@/stores/authStore'
import {  useEffect } from 'react';

const Login = () => {
  const {token} = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  },[token, navigate])
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
  )
}

export default Login