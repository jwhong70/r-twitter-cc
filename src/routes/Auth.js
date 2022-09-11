import React, { useState } from "react";
import { auth } from "./../fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  // #4-3-3
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // #4-4-1
  const [newAccount, setNewAccount] = useState(true);
  // #4-6-1
  const [error, setError] = useState("");
  // #4-3-4
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  // #4-3-5/#4-4-2
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      // #4-6-2
      setError(error.message);
    }
  };
  // #4-7-1
  const toggleAccount = () => setNewAccount((prev) => !prev);
  // #4-8-1
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div>
      {/* #4-3-1/#4-3-5 */}
      <form onSubmit={onSubmit}>
        {/* #4-3-1/#4-3-3/#4-3-4 */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        {/* #4-3-1/#4-3-3/#4-3-4 */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        {/* #4-3-1/#4-4-3 */}
        <input type="submit" value={newAccount ? "계정 생성" : "로그인"} />
        {/* #4-6-3 */}
        {error}
      </form>
      {/* #4-7-2/#4-7-3 */}
      <button onClick={toggleAccount}>
        {newAccount ? "로그인" : "계정 생성"}
      </button>
      <div>
        {/* #4-3-2/#4-8-2 */}
        <button onClick={onSocialClick} name="google">
          Google에서 계속
        </button>
        <button onClick={onSocialClick} name="github">
          Github에서 계속
        </button>
      </div>
    </div>
  );
};
export default Auth;
