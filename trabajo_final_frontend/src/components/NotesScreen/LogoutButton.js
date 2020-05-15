import {gql, useMutation} from "@apollo/client";
import React from 'react';
import '../../styles/LogoutButton.css';

const LOGOUT = gql`
    mutation ($username: String!, $token: ID!) {
        logout(username: $username, token: $token) {
            token
        }
    }
`;

const LogoutButton = (props) => {
    const [mutation] = useMutation(LOGOUT);

    const logoutButtonHandler = () => {
        mutation({
            variables: {
                username: props.user.username,
                token: props.user.token
            }
        }).then(data => {
            console.log(data);
            props.logout();
        });
    };

    return (
        <button className="LogoutButton" onClick={() => logoutButtonHandler()}>
            Logout
        </button>
    );
};

export default LogoutButton;