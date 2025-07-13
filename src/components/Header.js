import React from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Logout } from "@mui/icons-material";
import "../styles/Header.css";

const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="logo">TriFocus</h1>
      </div>

      <div className="header-center">
        <div className="greeting">Hey {user?.displayName || "there"} 👋</div>
        <div className="quote">
          “Discipline is the bridge between goals and accomplishment.”
        </div>
      </div>

      <div className="header-right">
        <button onClick={handleLogout} className="logout-btn" title="Logout">
          <Logout />
        </button>
      </div>
    </header>
  );
};

export default Header;
