import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { StudentDetails } from './pages/StudentDetails';
import { Infractions } from './pages/Infractions';
import { BanTypes } from './pages/BanTypes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="infractions" element={<Infractions />} />
          <Route path="ban-types" element={<BanTypes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}