import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
 
const HomeWrapper = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/dashboard")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            var errorMessage = error.message;
            
            console.log(errorCode, errorMessage)
            setError(errorCode);
        });
       
    }
 
    return(
        <div className='height-full'>
        <div className="row height-full">
            {/* left side */}
            <div className="left-column flex flex-column height-full justify-center items-center">
                <h1 className="welcoming-title">Welcome back</h1>
                <form className="form" autoComplete="off">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" name="email" id="email" className="input" onChange={(e)=>setEmail(e.target.value)} required />

                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="input"
                        required
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button
                        onClick={onLogin}
                        type="submit"
                        className="button regular-button pink-background cta-btn"
                    >
                        Log in
                    </button>
                    {error && 
                                <div className="error-message">
                                    <p>{error}</p>
                                </div>
                            }
                </form>
                <p className="sign-up-prompt">
                    Don’t have an account?
                    <a className="sign-up-link" onClick={() => navigate('/signup')}>Sign up</a>
                </p>
            </div>
            {/* right side */}
            <div className="right-column"></div>
        </div>
    </div>
    )
}

export default HomeWrapper;
