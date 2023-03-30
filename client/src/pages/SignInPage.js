import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignInPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        console.log(username);
        console.log(password);
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
        <button onClick={()=>navigate('/register')}>Register</button>
        </div>
    );
}

export default SignInPage;