import LoginRedirection from './LoginRedirection';
import '../../styles/RegisterScreen.css';
import RegisterBox from './RegisterBox';
import React from 'react';

const RegisterScreen = (props) => {
    return (
        <div className="RegisterScreen">
            <RegisterBox register={props.register}/>
            <LoginRedirection screenChange={props.screenChange}/>
        </div>
    );
};

export default RegisterScreen;