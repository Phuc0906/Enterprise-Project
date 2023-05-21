import React, {useState} from "react";
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";
import {getAuthHeaders} from "../utils";

const CategoryForm = () => {
    const [name, setName] = useState('');
    const data = {
        "name":name
    }
    const authHeader = useAuthHeader();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://${process.env.REACT_APP_API_URL}/category`,data, getAuthHeaders(authHeader()))
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CategoryForm;