import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yub from "yup";
import MField from "./MField";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
    const navigate = useNavigate();

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
            <div className="w-[50%] min-h-screen h-full bg-gradient-to-br from-cyan-500 to-blue-500">
                <div className="flex items-center justify-center p-4 gap-x-5">
                    <span
                        onClick={() => navigate("/home")}
                        className="font-semibold text-center text-white cursor-pointer select-none">
                        Home
                    </span>
                    <span
                        onClick={() => navigate("/register")}
                        className="font-semibold text-center text-white cursor-pointer select-none">
                        Register
                    </span>
                </div>
                <h2 className="mt-[10rem] font-thin text-center text-white text-8xl ">
                    "Creative is intelligence having fun"
                </h2>
            </div>
        </div>
    );
};

export default SignInForm;
