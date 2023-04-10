import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserRegistrationForm from "./components/UserRegistrationForm";
import { Routes, Route } from "react-router-dom";
import UsersListPage from "./components/UsersListPage";
import UserDetailPage from "./components/UserDetailPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserRegistrationForm />} />
      <Route path="/userList" element={<UsersListPage />} />
      <Route path="/userDetail/:id" element={<UserDetailPage />} />
    </Routes>
  );
}

export default App;
