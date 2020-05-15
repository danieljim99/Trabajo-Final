import {gql, useMutation, useQuery} from "@apollo/client";
import '../../styles/RemoveButton.css';
import React from 'react';

const NOTES = gql`
    query notes($username: String!, $token: ID!) {
        notes(username: $username, token: $token) {
            _id
            title
            body
            color {
                r
                g
                b
            }
        }
    }
`;

const REMOVE = gql`
    mutation ($username: String!, $token: ID!, $_id: ID!) {
        removeNote(username: $username, token: $token, _id: $_id) {
            _id
        }
    }
`;

const RemoveButton = (props) => {
    const [mutation] = useMutation(REMOVE);

    const {loading, data, error, refetch} = useQuery(NOTES, {
        variables: {
            username: props.user.username,
            token: props.user.token
        }
    });

    if(loading) return <div className="Loading">Loading...</div>

    if(error) return <div className="Error">Error... :(</div>

    props.updateNotes(data.notes);

    const remove = () => {
        mutation({
            variables: {
                username: props.user.username,
                token: props.user.token,
                _id: props.note._id
            }
        }).then(data => {
            console.log(data);
            refetch();
        });
    };

    return (
        <button className="RemoveButton" onClick={() => remove()}>
            <img className="RemoveImage" alt="RemoveImage" src="https://cdn2.iconfinder.com/data/icons/database-server-and-location/64/74-512.png"/>
        </button>
    );
};

export default RemoveButton;