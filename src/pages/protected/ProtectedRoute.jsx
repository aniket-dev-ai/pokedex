import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!currentUser) {
          setLoading(true);
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/check-auth`
          );
          const data = await res.json();
          if (data.success) {
            setOk(true);
            await dispatch(
              setUser({
                fullName: data.user.fullName,
                userName: data.user.userName,
                phoneNumber: data.user.phoneNumber,
                email: data.user.email,
              })
            );
          } else {
            navigate("/login");
          }
        } else {
          setOk(true);
        }
      } catch (error) {
        console.log(error);
        toast(
          error.message || "Something went wrong!. Please try again later!",
          {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "red",
              color: "white",
            },
          }
        );
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [currentUser]);

  return <>{loading && !ok ? <Loader /> : children}</>;
};

export default ProtectedRoute;
