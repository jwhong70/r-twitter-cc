import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { auth } from "./../fbase";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";

function App() {
  // #4-2-1
  // const user = auth.currentUser;
  // #3-6-1/#4-2-2
  // const [isLoggedIn, setIsLoggedIn] = useState(user);

  // #4-5-1
  const [init, setInit] = useState(false);
  // #3-6-1
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // #5-6-1
  const [userObj, setUserObj] = useState(null);
  // #4-5-2/#4-5-3
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // #5-6-2
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  // #7-3-1
  const refreshUser = async () => {
    await updateCurrentUser(auth, userObj);
    setUserObj(auth.currentUser);
  };
  return (
    // #3-5-3/#3-6-2/#4-5-4/#5-6-3
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          // #7-3-1
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
