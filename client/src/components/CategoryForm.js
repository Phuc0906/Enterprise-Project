import React, {useState} from "react";
import axios from "axios";

const CategoryForm = () => {
    const [name, setName] = useState('');
    const data = {
        "name":name
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/category',data)
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