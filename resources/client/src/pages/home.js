import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

class Home extends React.Component {
    render() {
        const { navigate } = this.props;

        return (
            <div className='height-full'>
                <div className="row height-full">
                    {/* left side */}
                    <div className="left-column flex flex-column height-full justify-center items-center">
                        <h1 className="welcoming-title">Welcome back</h1>
                        <form className="form" autoComplete="off">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" name="email" id="email" className="input" required />

                            <label htmlFor="password" className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input"
                                required
                            />

                            <button
                                type="submit"
                                className="button regular-button pink-background cta-btn"
                            >
                                Log in
                            </button>
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
        );
    }
}

// Functional component wrapper
function HomeWrapper() {
    const navigate = useNavigate();

    return <Home navigate={navigate} />;
}

export default HomeWrapper;
