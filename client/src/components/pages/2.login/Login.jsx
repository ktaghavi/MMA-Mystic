import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setUser }) {
    const nav = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObject = { "username": username, "password": password };

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        })
            .then(response => {
                if (!response.ok) {
                    throw Error("Network response error");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setUser(data);
                nav("/compare-fighters");
            })
            .catch(error => {
                console.log("error", error.message);
            });
    };

    const gradientBackground = {
        background: 'linear-gradient(180deg, #112c49 0%, #010010 100%)',
    };

    return (
        <div className="flex items-center justify-center h-screen" style={gradientBackground}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Username:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;