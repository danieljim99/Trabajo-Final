import {gql, useMutation} from "@apollo/client";
import React, { useState } from 'react';
import '../../styles/RegisterBox.css';

const REGISTER = gql`
  mutation ($username: String!, $password: String!) {
    register(username: $username, password: $password) {
        username
        token
    }
  }
`;

const RegisterBox = (props) => {
    const [error, setError] = useState(undefined);

    const [mutation] = useMutation(REGISTER);

    const buttonHandler = () => {
        mutation({
            variables: {
                username: document.getElementById("usernameInput").value,
                password: document.getElementById("passwordInput").value
            }
        }).then(data => {
            props.register(data);
        }).catch(error => {
            setError(error);
        });
    };

    return (
        <div className="RegisterBox">
            <div className="Title">
                Note App
            </div>
            <input className="UsernameInput" type="text" id="usernameInput" placeholder="Username"/>
            <input className="PasswordInput" type="password" id="passwordInput" placeholder="Password"/>
            <button className="RegisterButton" onClick={() => buttonHandler()}>
                Register
            </button>
            {error ? <div>Register error</div> : null}
        </div>
    );
};

export default RegisterBox;