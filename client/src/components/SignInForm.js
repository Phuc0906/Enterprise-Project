import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form, useField } from "formik";
import * as Yub from "yup";
import MField from "./MField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SignInForm = () => {
    const navigate = useNavigate();
    const signIn = useSignIn();
    const [flag, setFlag] = useState(true);
    const handleSubmit = useCallback(async (values) => {
        try {
            const response = await axios.post(
                `http://${process.env.REACT_APP_API_URL}/auth/authenticate`,
                {
                    phoneNumber: values.account,
                    password: values.password,
                }
            );

            console.log(response.data);
            localStorage.token = response.data.accessToken;
            const userProfile = response.data.profile;
            const profileData = {
                id: userProfile.id,
                name: userProfile.name,
                phone: userProfile.phoneNumber,
                address: userProfile.address,
                email: userProfile.email,
            };
            localStorage.profile = JSON.stringify(profileData);
            localStorage.role = response.data.role;
            localStorage.phoneNumber = profileData.phone;

            signIn({
                token: response.data.accessToken,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { phoneNumber: values.account },
            });

            if (response.data.role === "USER") {
                navigate("/");
            } else if (response.data.role === "SHIPPER") {
                navigate("/at-shop");
            } else {
                navigate("/shop/dashboard");
            }
            window.location.reload();
            setFlag(true);
        } catch (error) {
            setFlag(false);
        }
    }, []);

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
                        account: Yub.string()
                            .matches(phoneRegExp, "Phone number is not valid")
                            .required("Required"),
                        password: Yub.string().required("Required"),
                    })}
                    onSubmit={(val) => handleSubmit(val)}>
                    <Form className="w-2/3 p-4 mx-auto mt-[8rem] flex flex-col gap-y-3">
                        <MField
                            label="Account"
                            name="account"
                            placeholder="Phone Number"
                            type="text"></MField>
                        <MField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"></MField>
                        <button
                            type="submit"
                            className="w-full p-4 text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl hover:bg-gradient-to-b hover:from-[#97D9E1] hover:to-[#D9AFD9] ">
                            Sign in
                        </button>
                        {!flag && (
                            <div className="p-3 bg-gradient-to-r from-[#eb3349] to-[#f45c43] text-transparent bg-clip-text font-semibold text-center select-none">
                                <span>
                                    Your account or password is incorrect
                                </span>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
            <div className="w-[50%] min-h-screen h-full bg-gradient-to-br from-cyan-500 to-blue-500">
                <div className="flex items-center justify-center p-4 gap-x-5">
                    <span
                        onClick={() => navigate("/")}
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
