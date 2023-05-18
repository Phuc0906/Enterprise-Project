import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    const user = {
        name: name,
        email: email,
        address: address,
        phone: phone,
        password: password,
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`http://${process.env.REACT_APP_API_URL}/user/register`, user)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <br />
            <label>
                Address:
                <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </label>
            <br />
            <label>
                Phone Number:
                <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
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
            <label>
                Re-enter Password:
                <input
                    type="password"
                    value={reenterPassword}
                    onChange={(event) => setReenterPassword(event.target.value)}
                />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default RegisterPage;
