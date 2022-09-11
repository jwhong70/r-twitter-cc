import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

// #3-4/#3-6-3/#5-6-4/#7-3-1
const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      {/* #4-9-3/#7-2-1 */}
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {/* #3-6-4 */}
        {isLoggedIn ? (
          <>
            {/* #5-6-4 */}
            <Route path="/" element={<Home userObj={userObj} />} />
            {/*#4-9-4/#7-1-1/#7-3-1 */}
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
