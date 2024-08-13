import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/v1/auth/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, email, password }),
            });

            const data = await res.json();
            
            if (data.isValid) {
                navigate('/signin');
                setError(null);
            }else{
                setError(data.message);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
      
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSignUp} className="w-full max-w-md shadow-xl bg-slate-100 rounded-3xl p-5 text-center">
                <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-start text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="userName"
                        name="username"
                        required
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-lg  text-sm text-gray-900 focus:outline-none"
                    />
                </div>
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
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>

                <div className="mt-4">
                    <span>Already have an account? </span>
                    <span className="font-semibold">
                        <Link to="/signin" className="mt-4 text-sm">
                            Sign In
                        </Link>
                    </span>
                    {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
