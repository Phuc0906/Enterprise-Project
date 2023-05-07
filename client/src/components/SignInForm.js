import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yub from "yup";
import MField from "./MField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useSignIn} from "react-auth-kit";

const SignInForm = () => {
    const navigate = useNavigate();
    const signIn = useSignIn();
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/authenticate", {
                phoneNumber: values.account,
                password: values.password,
            });

            console.log(response.data);
            localStorage.token = response.data.accessToken;
            const userProfile = response.data.profile;
            const profileData = {
                name: userProfile.name,
                phone: userProfile.phoneNumber,
                address: userProfile.address,
                email: userProfile.email
            }
            localStorage.profile = JSON.stringify(profileData);
            localStorage.role = response.data.role;
            localStorage.phoneNumber = profileData.phone;

            signIn({
                token: response.data.accessToken,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {phonneNumber: values.account}
            })

            // if (response.data.role === 'USER') {
            //     localStorage.role = 1; // 1 for use and 0 for shop
            //     navigate('/');
            // }else {
            //     localStorage.role = 0;
            //     navigate('/shop/dashboard')
            // }
            // window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center w-full">
            <div className="w-[50%] h-screen">
                <h2 className="p-3 mt-10 text-5xl font-bold text-center">
                    Welcome back to Us!
                </h2>
                <Formik
                    initialValues={{
                        account: "",
                        password: "",
                    }}
                    validationSchema={Yub.object({
                        account: Yub.string().required("Required"),
                        password: Yub.string().required("Required"),
                    })}
                    onSubmit={(val) => handleSubmit(val)}>
                    <Form className="w-2/3 p-4 mx-auto mt-[8rem] flex flex-col gap-y-3">
                        <MField
                            label="Account"
                            name="account"
                            placeholder="Phone Number" type="text"></MField>
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
