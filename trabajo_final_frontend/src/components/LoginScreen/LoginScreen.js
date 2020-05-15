import RegisterRedirection from './RegisterRedirection';
import '../../styles/LoginScreen.css';
import LoginBox from './LoginBox';
import React from 'react';

const LoginScreen = (props) => {
    return (
        <div className="LoginScreen">
            <LoginBox login={props.login}/>
            <RegisterRedirection screenChange={props.screenChange}/>
        </div>
    );
};

export default LoginScreen;