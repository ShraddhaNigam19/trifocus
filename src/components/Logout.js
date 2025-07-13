import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Logout error:", error.message);
    }
  };

  return (
    <button
      className="text-sm text-indigo-500 hover:text-indigo-700 ml-2"
      onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
