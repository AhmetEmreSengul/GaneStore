import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

import MyGames from "./pages/MyGames";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import CreateGame from "./pages/CreateGame";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App = () => {
  const { checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex items-center justify-center bg-black min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/signup" element={user ? <Home /> : <Signup />} />
        <Route path="/my-games" element={<MyGames />} />
        <Route path="/create-game" element={<CreateGame />} />
      </Routes>
    </div>
  );
};

export default App;
