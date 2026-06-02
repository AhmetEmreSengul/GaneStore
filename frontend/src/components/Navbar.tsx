import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleAuthRequiredRoute = () => {
    toast.error("Please log in first");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 md:top-5 md:rounded-full w-screen md:w-5xl md:container h-25 md:h-17 bg-blue-900/20 backdrop-blur-sm flex items-center justify-between px-5 md:px-20 z-10">
      <Link to={"/"} className="text-white font-bold text-2xl font-mono">
        Game Store
      </Link>
      <div className="flex items-center gap-5">
        {user ? (
          <Link to="/my-games" className="text-white font-semibold">
            My Games
          </Link>
        ) : (
          <button
            className="text-white font-semibold cursor-pointer"
            onClick={handleAuthRequiredRoute}
          >
            My Games
          </button>
        )}
        {user ? (
          <Link to="/create-game" className="text-white font-semibold">
            Create Game
          </Link>
        ) : (
          <button
            className="text-white font-semibold cursor-pointer"
            onClick={handleAuthRequiredRoute}
          >
            Create Game
          </button>
        )}
        {user ? (
          <button
            onClick={logout}
            className="text-white font-semibold cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white font-semibold">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
