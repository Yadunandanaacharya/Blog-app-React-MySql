import React, { useContext, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext';

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://localhost:8800/api/auth/login", inputs
      // , {withCredentials: true}////with this code cookies will be set in browser application->storage->cookies
      // );
      //above login url moved to authcontext.js file below we use login method
      await login(inputs);

      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='authentication'>
      <h1>Login</h1>
      <form>
        <input type='text' placeholder='username' name='username' onChange={handleChange}>
        </input>
        <input type='password' placeholder='password'  name='password' onChange={handleChange}>
        </input>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login