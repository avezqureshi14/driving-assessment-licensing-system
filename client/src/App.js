import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Assessment from "./pages/Assessment";
import Navbar from "./components/Navbar";
import Results from "./pages/Results";
import Auth from "./pages/Auth";
import LoginForm from "./components/LoginForm";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Rules from "./components/Rules";
import Document from "./components/Document";
import License from "./components/License"

function App() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  let isAuthenticated; // Use let instead of const if the value changes

  if (profile === null) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules"  element={<Rules />} />
        <Route path="/assessments" element={<Assessment   />} />
        <Route path="/documents" element={<Document   />} />
        <Route path="/download" element={< License  />} />
        <Route path="/results" element={<Results />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<LoginForm  />} />
        <Route path="/profile/:id" element={<Profile  />} />
        <Route path="/update/:id" element={<Update  />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
