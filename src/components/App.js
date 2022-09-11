import React, { useState } from "react";
import AppRouter from "./Router";

function App() {
  // #3-6-1
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    // #3-5-3/#3-6-2
    <AppRouter isLoggedIn={isLoggedIn} />
  );
}

export default App;
