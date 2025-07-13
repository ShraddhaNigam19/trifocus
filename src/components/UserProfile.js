import React from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex items-center gap-4">
        <img
          src={user.photoURL}
          alt="User"
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <p className="font-semibold text-gray-800">{user.displayName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <button
        onClick={() => signOut(auth)}
        className="text-sm px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
