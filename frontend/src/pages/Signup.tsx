import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const { signup } = useAuthStore();

  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData);
    setFormData({
      Username: "",
      Email: "",
      Password: "",
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 size-80 md:size-100 justify-center"
      >
        <h1 className="text-3xl">Welcome</h1>
        <div className="space-y-4">
          <input
            className="p-4 w-full border-2 rounded-lg"
            placeholder="Full Name"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, Username: e.target.value })
            }
          />
          <input
            className="p-4 w-full border-2 rounded-lg"
            placeholder="Email"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
          />
          <div className="relative">
            <input
              className="p-4 w-full border-2 rounded-lg"
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
          Sign up
        </button>

        <div>
          Already have an account?{" "}
          {
            <Link to={"/login"} className="underline">
              Log in
            </Link>
          }
        </div>
      </form>
    </div>
  );
};

export default Signup;
