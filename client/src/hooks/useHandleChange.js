import { useState } from "react";

export default function useHandleChange(initialValues) {
    const [values, setValues] = useState(initialValues);
    const handleChange = (e) => {
        const type = e.target.type;
        setValues({
            ...values,
            [e.target.name]:
                type === "checkbox" ? e.target.checked : e.target.value,
        });
        console.log(values);
    };
    return {
        values,
        handleChange,
    };
}
