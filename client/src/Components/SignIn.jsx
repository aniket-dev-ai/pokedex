import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaGoogle, FaSpinner } from "react-icons/fa";
import { setUser } from "../store/slices/userSlice";
import toast from "react-hot-toast";

const SignIn = ({ setIsSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // sign-In function
  const handleSignIn = async () => {
    if (email.trim() === "" || password.trim() === "") {
      toast("All fields are required!", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await res.json();
      if (data?.success) {
        await dispatch(
          setUser({
            fullName: data.user.fullName,
            userName: data.user.userName,
            phoneNumber: data.user.phoneNumber,
            email: data.user.email,
          })
        );
        navigate("/");
      }
      toast(data?.message, {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: data?.success ? "green" : "red",
          color: "white",
        },
      });
    } catch (error) {
      console.log(error);
      toast("Something went wrong!", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8">
      <h2 className="text-3xl font-bold mb-6">Sign in</h2>
      <div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border text-white rounded-full focus:ring-2 focus:ring-yellow-500 outline-none bg-gray-900 disabled:opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border text-white rounded-full focus:ring-2 focus:ring-yellow-500 outline-none bg-gray-900 disabled:opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          className="w-full bg-yellow-500 flex justify-center text-white py-2 rounded-full font-semibold disabled:opacity-50"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin text-xl" /> : "SIGN IN"}
        </button>
      </div>

      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center space-x-3 mt-4">
          <p>Or Sign in with</p>
          <button className="max-[730px]:text-base text-lg font-bold flex items-center gap-1 p-1 rounded-lg border-4 border-s-blue-700 border-t-red-700 border-e-yellow-500 border-b-green-600 hover:scale-95">
            <span>Google</span>
            <span>
              <FaGoogle />
            </span>
          </button>
        </div>
        <button
          className="text-yellow-500 m-2 hover:underline hover:scale-105 transition-all duration-150 font-semibold flex items-center gap-1 sm:hidden"
          onClick={() => setIsSignIn(false)}
        >
          <span>SIGN UP</span>
          <span>
            <FaArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
