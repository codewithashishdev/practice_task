import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Registration";
import { Login } from "./pages/Login";
import { UserSelection } from "./pages/UserSelection";

function App() {
  return (
    <>
      <Router>
      <Routes>
          <Route exact path="/" element={<UserSelection />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
