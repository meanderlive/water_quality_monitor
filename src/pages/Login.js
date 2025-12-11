import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Link } from 'react-router-dom';
import axios from 'axios';
const styles = {
    container: {
        maxWidth: '500px',
        margin: '100px auto', // Add margin from top
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '25px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    errorMessage: {
        color: 'red',
        marginTop: '10px',
    },
};

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData({
//            ...formData,
//            [name]: value,
//        });
//    };
//
//    const handleSubmit = (e) => {
//        e.preventDefault();
//        // Check if the entered username and password match the required values
//        if (formData.username === 'admin' && formData.password === 'admin123') {
//            navigate('/Admin'); // Redirect to /Admin route on successful login
//        } else {
//            setError('Invalid username or password');
//        }
//    };
   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/users/login', {
                username: formData.username,
                password: formData.password
            });

            if (response.data) {
                // Optional: Store login session in localStorage or context
                navigate('/Admin'); // Redirect to Admin page on success
            }
        } catch (err) {
            setError('Invalid username or password');
            console.error('Login error:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div style={styles.container}>
            <h1>Administrator Login</h1>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Click here to Login</button>
                {error && <p style={styles.errorMessage}>{error}</p>}
            </form>
            <Link to="/register" style={styles.link}> Create a new account? SignUp here</Link>
        </div>
    );
}

export default Login;