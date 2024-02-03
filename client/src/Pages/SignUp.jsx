import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  allError,
} from "../Redux/user/userSlice";
import Gauth from "../Components/Gauth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allError());
  }, [dispatch]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/sign-in");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <div>
      <div>
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              className="border p-3 rounded-lg"
              id="username"
              value={formData.username}
              onChange={changeHandler}
            ></input>
            <input
              type="text"
              placeholder="Email"
              className="border p-3 rounded-lg"
              id="email"
              value={formData.email}
              onChange={changeHandler}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg"
              id="password"
              value={formData.password}
              onChange={changeHandler}
            ></input>

            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <Gauth />
          </form>
          <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-blue-700">Sign In</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
