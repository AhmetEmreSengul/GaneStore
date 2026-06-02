import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const { login } = useAuthStore();

  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 size-80 md:size-100 justify-center"
      >
        <h1 className="text-3xl">Welcome Back</h1>
        <div className="space-y-4">
          <input
            className="p-4 w-full border-2 border-white/50 rounded-lg placeholder:text-white/30"
            placeholder="Email"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
            required
          />
          <div className="relative">
            <input
              className="p-4 w-full border-2 border-white/50 rounded-lg placeholder:text-white/30"
              placeholder="Password"
              type={isVisible ? "text" : "password"}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
              required
            />
            <span className="absolute top-1/3 right-5">
              {isVisible ? (
                <FaEye className="size-6" onClick={() => setIsVisible(false)} />
              ) : (
                <FaEyeSlash
                  className="size-6"
                  onClick={() => setIsVisible(true)}
                />
              )}
            </span>
          </div>
        </div>
        <button
          className="bg-white hover:bg-transparent text-black hover:text-white border-2 border-white p-4 rounded-lg cursor-pointer transition"
          type="submit"
        >
          Login
        </button>

        <div>
          Don't have an account?{" "}
          {
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          }
        </div>
      </form>
    </div>
  );
};

export default Login;
