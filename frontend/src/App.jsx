import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
import { StarterPage } from './pages/StarterPage';
import LoginForm from './pages/Authentication/LoginForm';
import HomePage from './pages/HomePage';
import SignupForm from './pages/Authentication/SignupForm';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import OTPVerification from './pages/Authentication/OTPVerification';
import OneClassPage from './pages/OneClassPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StarterPage />}> </Route>
      <Route path="/home" element={<HomePage />}> </Route>
      <Route path="/login" element={<LoginForm />}> </Route>
      <Route path="/signup" element={<SignupForm />}> </Route>
      <Route path="/forgot-password" element={<ForgotPassword />}> </Route>
      <Route path="/otp-verification" element={<OTPVerification />}> </Route>
      <Route path="/one-class" element={<OneClassPage />}> </Route>
      <Route path="/setting" element={<SettingPage />}> </Route>
      <Route path="/profile" element={<ProfilePage />}> </Route>


    </Routes>
  )
}

export default App
