import '../../styles/RegisterRedirection.css';
import React from 'react';

const RegisterRedirection = (props) => {
    return (
        <div className="RegisterRedirection">
            <div className="Text">
                Need an account?
            </div>
            <div className="RegisterLink" onClick={() => props.screenChange(1)}>
                <u>Register</u>
            </div>
        </div>
    );
};

export default RegisterRedirection;