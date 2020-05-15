import '../../styles/LoginRedirection.css';
import React from 'react';

const LoginRedirection = (props) => {
    return (
        <div className="LoginRedirection">
            <div className="Text">
                Have an account?
            </div>
            <div className="LoginLink" onClick={() => props.screenChange(0)}>
                <u>Login</u>
            </div>
        </div>
    );
};

export default LoginRedirection;