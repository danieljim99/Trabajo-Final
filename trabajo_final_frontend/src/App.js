import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import NotesScreen from './components/NotesScreen/NotesScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import React, {useState} from 'react';
import './styles/App.css';

function App() {
  const [screenSelection, setScreenSelection] = useState(0);
  const [user, setUser] = useState(undefined);

  const screenChangeHandler = (screen) => {
    setScreenSelection(screen);
  };

  const register = (data) => {
    setScreenSelection(0);
  };

  const login = (data) => {
    setUser({
      username: data.data.login.username,
      token: data.data.login.token
    })
    
    setScreenSelection(2);
  };

  const logout = () => {
    setScreenSelection(0);
    setUser(undefined);
  };

  let screen = null;

  switch(screenSelection) {
    case 0:
      screen = (
        <LoginScreen screenChange={screenChangeHandler} login={login}/>
      );
      break;
    case 1:
      screen = (
        <RegisterScreen screenChange={screenChangeHandler} register={register}/>
      );
      break;
    case 2:
      screen = (
        <NotesScreen screenChange={screenChangeHandler} logout={logout} user={user}/>
      );
      break;
    default:
      screen = (
        <LoginScreen screenChange={screenChangeHandler}/>
      );
  }

  const client = new ApolloClient({
    link: createHttpLink({
      uri: "http://localhost:4000/",
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {screen}
      </div>
    </ApolloProvider>
  );
}

export default App;