import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";

function Login({setUser}) {
    const nav = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                setUser(data)
                nav("/compare-fighters");
            })
            .catch(error => {
                console.log("error", error.message);
            });
    };

    return (
        <div className="">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label>Username:</label>
                    <input
                        className="border-2 border-black-500 my-2"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="">
                    <label>Password:</label>
                    <input
                        className="border-2 border-black-500 my-2"
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