import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Optional, for prop type validation

class Signup extends React.Component {
    render(){
        const { navigate } = this.props;
        return (
            <div className="height-full">
                <div className="row height-full">
                    {/* left side */}
                    <div className="left-column flex flex-column height-full justify-center items-center">
                        <h1 className="welcoming-title">Hello</h1>
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
                                Sign up
                            </button>
                        </form>
                        <p className="login-prompt">
                            Already have an account?
                            <a onClick={() => navigate(-1)} className="log-in-link">Log in</a>
                        </p>
                    </div>
                    {/* right side */}
                    <div className="right-column"></div>
                </div>
            </div>
        );
    }
}

// Optional, for prop type validation
Signup.propTypes = {
    navigate: PropTypes.func.isRequired,
};

function SignupWrapper() {
    const navigate = useNavigate();

    return <Signup navigate={navigate} />;
}

export default SignupWrapper;
