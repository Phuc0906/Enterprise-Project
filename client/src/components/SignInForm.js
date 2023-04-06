import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yub from "yup";
import MField from "./MField";

const SignInForm = () => {
    return (
        <div className="flex items-center w-full">
            <div className="w-[50%] h-screen">
                <h2 className="p-3 mt-10 text-5xl font-bold text-center">
                    Welcome back to Us!
                </h2>
                <Formik
                    initialValues={{
                        userName: "",
                        password: "",
                    }}
                    validationSchema={Yub.object({
                        account: Yub.string().required("Required").email(),
                        password: Yub.string().required("Required"),
                    })}
                    onSubmit={(val) => console.log(val)}>
                    <Form className="w-2/3 p-4 mx-auto mt-[8rem] flex flex-col gap-y-3">
                        <MField
                            type="email"
                            label="Account"
                            name="account"
                            placeholder="Enter your email address"></MField>
                        <MField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"></MField>
                        <button
                            type="submit"
                            className="w-full p-4 text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl">
                            Sign in
                        </button>
                    </Form>
                </Formik>
            </div>
            <div className="w-[50%] h-screen bg-gradient-to-br from-cyan-500 to-blue-500">
                <div className="flex items-center justify-center w-full h-full">
                    <h2 className="font-bold text-center text-white text-8xl">
                        "Creative is intelligence having fun"
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
