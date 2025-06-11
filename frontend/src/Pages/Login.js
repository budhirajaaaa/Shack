import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginVissible, setLoginVissible] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const handleSignUpChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        cred
      );
      login(res.data.token);
      navigate("/home");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        signUp
      );
      toast.success(res?.data?.message);
      console.log(res);
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="socialContainer">
          <h1>Shack.</h1>
          <h4>Beyond posts. Building bonds.</h4>
          <img src="/socialshaft.png"></img>
        </div>
        {loginVissible ? (
          <div className="loginSignUpContainer" key="login">
            <h2>Login</h2>
            <p>
              Doesn't have an account yet?
              <Link onClick={() => setLoginVissible(!loginVissible)}>
                Sign Up
              </Link>
            </p>
            <div className="loginForm">
              <label>Email</label>
              <br />
              <input
                name="email"
                placeholder="Email Address"
                type="text"
                onChange={handleChange}
              />
              <br />
              <label>Password</label>
              <br />
              <input
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
              />
              <br />
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={handleSubmit}
              >
                Log In
              </button>
              <br />
              <Link>Forgot Password?</Link>
            </div>
          </div>
        ) : (
          <div className="loginSignUpContainer" key="signUp">
            <h2>Sign Up</h2>
            <p>
              Already have an account?
              <Link onClick={() => setLoginVissible(!loginVissible)}>
                {" "}
                LogIn
              </Link>
            </p>
            <div className="loginForm">
              <label>Username</label>
              <br />
              <input
                name="username"
                placeholder="Username"
                type="text"
                onChange={handleSignUpChange}
              />
              <br />
              <label>Email</label>
              <br />
              <input
                name="email"
                placeholder="Email Address"
                type="text"
                onChange={handleSignUpChange}
              />
              <br />
              <label>Password</label>
              <br />
              <input
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleSignUpChange}
              />
              <br />
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={handleRegister}
              >
                Sign Up
              </button>
              <br />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
