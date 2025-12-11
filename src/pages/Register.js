import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = {
    container: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',
    },
    formGroup: {
        marginBottom: '20px',
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
        marginTop: '10px',
    },
    link: {
        display: 'block',
        textAlign: 'center',
        marginTop: '20px',
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '16px',
    },
};

function Register() {
    const [formData, setFormData] = useState({

        username: '',
        password: '',
    });

    const [formError, setFormError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if ( !formData.username || !formData.password) {
        setFormError('Please fill out all fields.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8081/api/users', formData);
        console.log('Response:', response.data);

        // Reset form and show success message
        setFormData({

            username: '',
            password: '',
        });
        setFormError('Registration successful!');
    } catch (error) {
        console.error('Error submitting form:', error);
        setFormError('Registration failed. Please try again.');
    }
};


//    const handleSubmit = (e) => {
//        e.preventDefault();
//        // Basic form validation
//        if (!formData.name || !formData.email || !formData.password) {
//            setFormError('Please fill out all fields.');
//            return;
//        }
//        // Handle form submission
//        console.log(formData);
//        // Reset form and clear error message
//        setFormData({
//            username: '',
//            email: '',
//            password: '',
//        });
//        setFormError('Registration successful!');
//    };

    return (
        <div style={styles.container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

                <div style={styles.formGroup}>
                    <label style={styles.label}>UserName</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.email}
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
                {formError && <p style={{ color: 'red' }}>{formError}</p>}
                <button type="submit" style={styles.button}>Register</button>
            </form>
            <Link to="/login" style={styles.link}>Already have an account? Login here</Link>
        </div>
    );
}

export default Register;