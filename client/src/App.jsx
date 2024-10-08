import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
// import PropTypes from 'prop-types';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import RightBar from "./componets/rightbar/RightBar";
import Navbar from "./componets/navbar/Navbar";
import LeftBar from "./componets/leftBar/LeftBar";
import Home from "./pages/home/Home";
import "./style.scss";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkMode";
import { AuthContext} from "./context/authContext";

export default function App() {
  const { currentUser } = useContext(AuthContext);
  const {darkMode} = useContext(DarkModeContext)
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark": "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    //children is Layout in route
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* Define the Layout route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Nested routes will be rendered in the Outlet component */}
            <Route path="/" element={<Home />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

// import  Login  from './pages/login/Login.jsx';
// import  Register  from "./pages/register/Register";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// function App() {
//     <Router>
//       <Routes>
//         <Route path="/register" element={< Register/>} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>

// export default App;

// const App = () => (
//   <Router>
//     <Routes>
//       {/* <Route path="/" element={<Home />} /> */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//   </Router>
// );

// export default App;
// import React from 'react'

{
  /* <Route path="/" element={<Layout />, Children:[
  {
    path="/Home",
    element={<Home />}
  },{
    path="/profile/:id",
  element={<Profile />}
  }
  
]} /> */
}
