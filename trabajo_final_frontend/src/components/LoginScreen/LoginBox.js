import {gql, useMutation} from "@apollo/client";
import React, { useState } from 'react';
import '../../styles/LoginBox.css';

const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        username
        token
    }
  }
`;

const LoginBox = (props) => {
    const [error, setError] = useState(undefined);

    const [mutation] = useMutation(LOGIN);

    const loginButtonHandler = () => {
        mutation({
            variables: {
                username: document.getElementById("usernameInput").value,
                password: document.getElementById("passwordInput").value
            }
        }).then(data => {
            props.login(data);
        }).catch(error => {
            setError(error);
        });
    };

    return (
        <div className="LoginBox">
            <div className="Title">
                Note App
            </div>
            <input className="UsernameInput" type="text" id="usernameInput" placeholder="Username"/>
            <input className="PasswordInput" type="password" id="passwordInput" placeholder="Password"/>
            <button className="LoginButton" onClick={() => loginButtonHandler()}>
                Login
            </button>
            {error ? <div>Login error</div> : null}
        </div>
    );
};

export default LoginBox;