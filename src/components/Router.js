import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

// #3-4/#3-6-3/#5-6-4
const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      {/* #4-9-3 */}
      {isLoggedIn && <Navigation />}
      <Routes>
        {/* #3-6-4 */}
        {isLoggedIn ? (
          <>
            {/* #5-6-4 */}
            <Route path="/" element={<Home userObj={userObj} />} />
            {/*#4-9-4 */}
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
