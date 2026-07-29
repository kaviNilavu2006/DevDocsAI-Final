import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../api/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Register button clicked");

        try {
            const response = await fetch(
                `${API_BASE_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert("Registration Successful!");
                navigate("/login");
            } else {
                let errorMsg = "Registration failed";
                try {
                    const data = await response.json();
                    errorMsg = data.message || data.error || errorMsg;
                } catch (e) {
                    errorMsg = await response.text();
                }
                alert(errorMsg);
            }
        } catch (err) {
            alert("Connection error. Please try again.");
            console.error(err);
        }
    };

    return (
        <div style={{ width: "400px", margin: "50px auto" }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <button type="submit">Register</button>
            </form>

            <br />

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;