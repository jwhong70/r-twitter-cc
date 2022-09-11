import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

// #3-4/#3-6-3
const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* #3-6-4 */}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
