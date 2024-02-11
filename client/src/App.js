import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Assessment from "./pages/Assessment";
import Navbar from "./components/Navbar";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Assessment />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
