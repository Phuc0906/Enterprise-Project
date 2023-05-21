import React, {useEffect, useState} from "react";
import * as Yub from "yup";
import axios from "axios";
import {Form, Formik} from "formik";
import MField from "../components/MField";

const UserProfilePage = () => {
    const [state, setState] = useState(false);
    const profile = JSON.parse(localStorage.profile);

    useEffect(() => {
        console.log(profile);
    }, [])

    return <div>
        <div className="m-6 shadow-xl bg-gray-50 p-4 rounded-2xl">
            <div className="m-6">
                <label className="text-3xl font-bold" >My Account</label>
            </div>
            <div className="mt-14 ml-6">
                <div className="">
                    <div className="pb-4 border-b-2 border-gray-200">
                        <label className="text-xl font-bold ">Personal Information</label>
                    </div>
                    <div className="mt-6">
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                email: profile.email,
                                fullname: profile.name,
                                phone: profile.phone,
                                address: (profile.address === null) ? "" : profile.address,
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
                            })}
                            onSubmit={(values, actions) => {
                                // console.log("SignUpFormFinal ~ actions", actions);
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

                                localStorage.profile = JSON.stringify({
                                    name: values.fullname,
                                    email: values.email,
                                    address: values.address,
                                    phone: values.phone
                                })

                                fetch(`http://${process.env.REACT_APP_API_URL}/api/user`, {
                                    method: 'PUT',
                                    credentials: "include",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + localStorage.token
                                    },
                                    body: JSON.stringify({
                                        fullName: values.fullname,
                                        email: values.email,
                                        address: values.address,
                                        phoneNumber: values.phone
                                    })
                                }).then(res => {
                                    console.log(res);
                                    window.location.reload();
                                }).then(data => {
                                    console.log(data)
                                });

                                const parent = document.querySelector(".parent");
                                const template = `<div>Successfull</div>`;
                                parent.insertAdjacentHTML("afterbegin", template);
                            }}>
                            {(formik) => {
                                return (
                                    <Form
                                        className={`w-full `}>
                                        <div className="flex gap-8">
                                            <MField
                                                name="fullname"
                                                placeholder="Enter your Full name"
                                                label="Full Name"></MField>
                                            <MField
                                                name="phone"
                                                placeholder="Enter your phone"
                                                label="Phone"
                                                type="text"></MField>
                                        </div>
                                        <div className="mt-6 w-[600px]">
                                            <MField
                                                name="address"
                                                placeholder="Enter your address"
                                                label="Address"
                                                type="text"></MField>
                                        </div>
                                        <div className="mt-6 w-[600px]">
                                            <MField
                                                name="email"
                                                placeholder="Enter your Email"
                                                label="Email"
                                                type="text"></MField>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-fit p-4 mt-8 font-semibold text-white bg-blue-600 rounded-lg"
                                                disabled={formik.isSubmitting}>
                                                Save Information
                                            </button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>

                </div>
                <div className="mt-6">
                    <div className="pb-4 border-b-2 border-gray-200">
                        <label className="text-xl font-bold ">Password</label>
                    </div>
                    <div className="mt-6">
                        <Formik
                            initialValues={{
                                password: "",
                                newPassword: "",
                                passwordConfirmation: "",
                            }}
                            validationSchema={Yub.object({
                                password: Yub.string().required("Password is required"),
                                newPassword: Yub.string().required("Password is required"),
                                passwordConfirmation: Yub.string().oneOf(
                                    [Yub.ref("newPassword"), null],
                                    "Passwords must match"
                                )
                            })}
                            onSubmit={(values, actions) => {
                                console.log(values);
                                setTimeout(() => {
                                    actions.resetForm({
                                        password: "",
                                        newPassword: "",
                                        passwordConfirmation: "",
                                    });
                                    actions.setSubmitting(false);
                                }, 2000);
                            }}>
                            {(formik) => {
                                return (
                                    <Form
                                        className={`w-1/2 `}>
                                        <div className="mt-6">
                                            <MField
                                                name="password"
                                                placeholder="Enter your current password"
                                                label="Password"
                                                type="password"></MField>
                                        </div>

                                        <div className="mt-6">
                                            <MField
                                                name="newPassword"
                                                placeholder="Enter your new password"
                                                label="New Password"
                                                type="password"></MField>
                                        </div>

                                        <div className="mt-6">
                                            <MField
                                                name="passwordConfirmation"
                                                placeholder="Confirm your new password"
                                                label="Confirmation"
                                                type="password"></MField>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-fit p-4 mt-8 font-semibold text-white bg-blue-600 rounded-lg"
                                                disabled={formik.isSubmitting}>
                                                Change Password
                                            </button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>

                </div>


            </div>
        </div>
    </div>
}

export default UserProfilePage;