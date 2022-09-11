import { React, useState, useEffect } from "react";
import { auth, db } from "./../fbase";
import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// #7-1-2/#7-3-1
const Profile = ({ userObj, refreshUser }) => {
  // #4-10-1
  const navigate = useNavigate();
  // #7-2-4
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  // #4-10-1
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };
  // #7-1-3
  const getMyTweets = async () => {
    // #7-1-4
    const myQuery = query(
      collection(db, "tweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    // #7-1-5
    const querySnapshot = await getDocs(myQuery);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  // #7-2-6
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  // #7-2-7
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      // #7-3-2
      refreshUser();
    }
  };
  // #7-1-6
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <>
      {/* #7-2-5/#7-2-7 */}
      <form onSubmit={onSubmit}>
        {/* #7-2-5/#7-2-6 */}
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        {/* #7-2-5 */}
        <input type="submit" value="Update Profile" />
      </form>
      {/* #4-10-2 */}
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
