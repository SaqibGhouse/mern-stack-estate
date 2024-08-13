import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import Header from '../../components/Header/Header'
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch('/api/v1/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.isValid == false) {
        dispatch(signInFailure(data.message));
      } else {
        navigate('/');
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }

  };

  return (
    <>
      {/* <Header/> */}
      <div className="flex flex-col items-center justify-center mt-48">
        <form onSubmit={handleSignUp} className="w-full max-w-md shadow-xl bg-slate-100 rounded-3xl p-5 text-center">
          <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-start text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-start text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
            />
          </div>
          <button type="submit" disabled={loading} className={"bg-blue-500 w-10/12 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 " + (loading && 'opacity-50 cursor-not-allowed bg-gray-500')}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>

          <div className="mt-4">
            <span>Dont have an account? </span>
            <span className="font-semibold">
              <Link to="/signup" className="mt-4 text-sm">
                Sign Up
              </Link>
            </span>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
