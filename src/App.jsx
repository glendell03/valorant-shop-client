import { Routes, Route } from "react-router-dom";
import Login from "@/pages/login";
import Home from "@/pages/home";
import Profile from "./pages/profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
