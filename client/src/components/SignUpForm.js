import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yub from "yup";

const SignUpForm = () => {
    return (
        <div className="">
            <h1 className="p-5 mt-8 text-3xl font-bold text-center">Sign Up</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    role: "",
                    passwordConfirmation: "",
                    term: false,
                }}
                validationSchema={Yub.object({
                    firstName: Yub.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    lastName: Yub.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    email: Yub.string()
                        .email("Email must be a valid email")
                        .required("Required"),
                    role: Yub.string().required("Required"),
                    password: Yub.string().required("Password is required"),
                    passwordConfirmation: Yub.string().oneOf(
                        [Yub.ref("password"), null],
                        "Passwords must match"
                    ),
                    term: Yub.boolean(),
                })}
                onSubmit={(values) => console.log(values)}>
                <Form className="p-10 w-full max-w-[500px] mx-auto shadow-primary rounded-[10px]">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="firstName">First Name</label>
                        <Field
                            name="firstName"
                            className="p-3 border border-gray-100 rounded-lg mt-[-5px]"
                            type="text"
                            placeholder="Enter Your First Name"></Field>
                        <div className="text-sm text-red-500 mt-[-8px]">
                            <ErrorMessage name="firstName"></ErrorMessage>
                        </div>
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                            name="lastName"
                            className="p-3 border border-gray-100 rounded-lg mt-[-5px]"
                            type="text"
                            placeholder="Enter Your Last Name"></Field>
                        <div className="text-sm text-red-500 mt-[-8px]">
                            <ErrorMessage name="lastName"></ErrorMessage>
                        </div>
                        <label htmlFor="email">Email</label>
                        <Field
                            name="email"
                            className="p-3 border border-gray-100 rounded-lg mt-[-5px]"
                            type="email"
                            placeholder="Enter Your Email"></Field>
                        <div className="text-sm text-red-500 mt-[-8px]">
                            <ErrorMessage name="email"></ErrorMessage>
                        </div>

                        <label htmlFor="email">Role</label>
                        <Field
                            name="role"
                            className="p-3 border border-gray-100 rounded-lg mt-[-5px]"
                            as="select"
                            placeholder="Enter Your Email">
                            <option value="Seller">Seller</option>
                            <option value="User">User</option>
                        </Field>
                        <div className="text-sm text-red-500 mt-[-8px]">
                            <ErrorMessage name="email"></ErrorMessage>
                        </div>
                        <label htmlFor="password">Password</label>
                        <Field
                            name="password"
                            className="p-3 border border-gray-100 rounded-lg mt-[-5px]"
                            type="password"
                            placeholder="Enter Your Password"></Field>
                        <div className="text-sm text-red-500 mt-[-8px]">
                            <ErrorMessage name="password"></ErrorMessage>
                        </div>
                        <label htmlFor="passwordConfirmation">
                            Confirmation
                        </label>
                        <Field
                            name="passwordConfirmation"
                            className="p-3 border border-gray-100 rounded-lg mt-[-5px]"
                            type="password"
                            placeholder="Confirm your password"></Field>
                        <div className="text-sm text-red-500 mt-[-8px]">
                            <ErrorMessage name="passwordConfirmation"></ErrorMessage>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <Field name="term" type="checkbox"></Field>
                            <p className="font-semibold">
                                I accept all terms and conditions
                            </p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-4 mt-8 font-semibold text-white bg-blue-600 rounded-lg">
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default SignUpForm;
