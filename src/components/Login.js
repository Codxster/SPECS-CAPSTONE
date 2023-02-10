import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/login.css";
import AuthContext from "../store/AuthContext";

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [register, setRegister] = useState(false);
  const {login} = useContext(AuthContext)

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(register ? '/register' : '/login', { username, password });
      login(response.data.token, response.data.exp, response.data.userId)
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="loginContainer">
      <section className="loginBox">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input
            className="loginCred"
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="loginCred"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="loginBtn">
            {register ? "Register" : 'Login'}
          </button>
          {error && <p>{error}</p>}
        </form>
        <button className="registerBox" onClick={() => setRegister(!register)}>
          {register ? "Want to login?" : "Don't have an account?"}
        </button>
      </section>
    </div>
  );
}

export default Login;
