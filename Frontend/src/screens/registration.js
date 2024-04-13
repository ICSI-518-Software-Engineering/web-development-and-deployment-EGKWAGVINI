// App.js
import React, { useState } from 'react';

function Registration() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSignup = (username, password) => {
    // Here you would typically send a request to your backend to create a new user
    // For the sake of simplicity, let's just log the user in immediately
    setLoggedIn(true);
    setUserData({ username, password });
  };

  const handleLogin = (username, password) => {
    // Here you would typically send a request to your backend to authenticate the user
    // For the sake of simplicity, let's just log the user in immediately
    setLoggedIn(true);
    setUserData({ username, password });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserData(null);
  };

  return (
    <div>
      {!loggedIn && (
        <SignupPage onSignup={handleSignup} />
      )}
      {!loggedIn && (
        <LoginPage onLogin={handleLogin} />
      )}
      {loggedIn && (
        <UserInfoPage userData={userData} onLogout={handleLogout} />
      )}
    </div>
  );
}

function SignupPage({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(username, password);
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="submit"
          value="Signup"
          style={styles.button}
        />
      </form>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="submit"
          value="Login"
          style={styles.button}
        />
      </form>
    </div>
  );
}

function UserInfoPage({ userData, onLogout }) {
  return (
    <div style={styles.container}>
      <h2>Welcome, {userData.username}!</h2>
      <p>This is your user information page.</p>
      <button onClick={onLogout} style={styles.button}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Registration;
