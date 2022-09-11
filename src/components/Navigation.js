import React from "react";
import { Link } from "react-router-dom";

// #4-9-1
const Navigation = () => (
  <nav>
    <ul>
      <li>
        {/* #4-9-2 */}
        <Link to="/">Home</Link>
      </li>
      <li>
        {/* #4-9-2 */}
        <Link to="/profile">My Profile</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
