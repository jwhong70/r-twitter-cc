import React from "react";
import { Link } from "react-router-dom";

// #4-9-1/#7-2-2
const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        {/* #4-9-2 */}
        <Link to="/">Home</Link>
      </li>
      <li>
        {/* #4-9-2/#7-2-3 */}
        <Link to="/profile">{userObj.displayName}의 Profile</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
