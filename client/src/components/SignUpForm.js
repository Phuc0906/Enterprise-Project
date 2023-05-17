import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import MField from "./MField";
import * as Yub from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import * as Yub from "yup";

const SignUpForm = () => {
    const [state, setState] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="p-5 mt-8 text-3xl font-bold text-center">Sign Up</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    role: "seller",
                    passwordConfirmation: "",
                    terms: false,
                }}
                validationSchema={Yub.object({
                    fullname: Yub.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    phone: Yub.string().required("Required"),
                    email: Yub.string()
                        .email("Invalid")
                        .required("Required"),
                    address: Yub.string().required("Required"),
                    role: Yub.string().required("Required"),
                    password: Yub.string().required("Password is required"),
                    passwordConfirmation: Yub.string().oneOf(
                        [Yub.ref("password"), null],
                        "Passwords must match"
                    ),
                    terms: Yub.boolean().oneOf(
                        [true],
                        "Please agree with the terms and conditions"
                    ),
                })}
                onSubmit={(values, actions) => {
                    console.log(values);
                    setTimeout(() => {
                        actions.resetForm({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            role: "seller",
                            passwordConfirmation: "",
                            terms: false,
                        });
                        actions.setSubmitting(false);
                    }, 2000);
                    setState(true);

                    axios.post('http://localhost:8080/auth/register', {
                        name: values.fullname,
                        email: values.email,
                        address: values.address,
                        role: (values.role === 'user') ? 'USER' : (values.role === 'shipper') ? 'SHIPPER' : 'SHOP',
                        phoneNumber: values.phone,
                        password: values.password
                    }).then(res => {
                        console.log(res);
                    })

                    const parent = document.querySelector(".parent");
                    const template = `<div>Successfull</div>`;
                    parent.insertAdjacentHTML("afterbegin", template);
                    navigate("/login")
                }}>
                {(formik) => {
                    return (
                        <div className="parent relative p-8 w-full max-w-[500px] mx-auto shadow-primary rounded-[10px] overflow-hidden">
                            <Form
                                className={`w-full ${
                                    state
                                        ? "transition-all duration-150 animate-fadeout translate-x-[-150%] "
                                        : ""
                                }`}>
                                <div className="flex flex-col gap-3">
                                    <MField
                                        name="fullname"
                                        placeholder="Enter your Full name"
                                        label="Full Name"></MField>
                                    <MField
                                        name="phone"
                                        placeholder="Enter your phone"
                                        label="Phone"
                                        type="text"></MField>
                                    <MField
                                        name="email"
                                        placeholder="Enter your email address"
                                        label="Email Address"
                                        type="email"></MField>
                                    <MField
                                        name="address"
                                        placeholder="Enter your address"
                                        label="Address"
                                        type="text"></MField>
                                    <MSelect name="role" label="Role">
                                        <option value="seller">Seller</option>
                                        <option value="user">User</option>
                                        <option value="shipper">SHIPPER</option>
                                    </MSelect>
                                    <MField
                                        name="password"
                                        placeholder="Enter your password"
                                        label="Password"
                                        type="password"></MField>
                                    <MField
                                        name="passwordConfirmation"
                                        placeholder="Confirm your password"
                                        label="Confirmation"
                                        type="password"></MField>
                                    <MCheckBox name="terms">
                                        I accept all terms and conditions
                                    </MCheckBox>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full p-4 mt-8 font-semibold text-white bg-blue-600 rounded-lg"
                                    disabled={formik.isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
};

const MSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor={field.name}>
                {label}
            </label>
            <select
                className="p-3 border border-gray-100 rounded-lg"
                {...field}
                {...props}
            />
            {meta.error ? (
                <div className="text-sm text-red-500">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MCheckBox = ({ children, ...props }) => {
    const [field, meta] = useField(props);
    // console.log(children);
    return (
        <div>
            <div className="flex items-center gap-2">
                <input
                    className="p-3 border border-gray-100 rounded-lg"
                    type="checkbox"
                    {...field}
                    {...props}
                />
                <p>{children}</p>
            </div>
            {meta.touched && meta.error ? (
                <div className="text-sm text-red-500">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default SignUpForm;
