import React from "react";
import { auth } from "./../fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // #4-10-1
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };
  return (
    <>
      {/* #4-10-2 */}
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
