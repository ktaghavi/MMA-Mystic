import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../../../hooks/usersStore";

function Login() {
    const nav = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {user, updateUser} = useUserStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObject = { "username": username, "password": password }

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error("Network response error");
                }
                return response.json();
            })
            .then(data => {
              console.log(data);
              updateUser(data)
              nav("/compare-fighters");
            })
            .catch(error => {
              console.log("error", error.message);
            });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;