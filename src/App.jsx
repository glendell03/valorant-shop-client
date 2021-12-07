import { Routes, Route } from "react-router-dom";
import Login from "@/pages/login";
import Home from "@/pages/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
