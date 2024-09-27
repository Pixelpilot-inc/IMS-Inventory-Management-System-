import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import axios from 'axios';

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const loginUser = (credentials) => {
        if (credentials.email === "" || credentials.password === "") {
            alert("Please enter email and password to proceed.");
            return;
        }

        axios.post(
            "https://ims-api-beige.vercel.app/api/login",
            credentials,
            { withCredentials: true }
        )
            .then((response) => {
                alert("Successfully Logged In");
                localStorage.setItem("user", JSON.stringify(response.data));
                authContext.signin(response.data._id, () => {
                    navigate("/");
                });
            })
            .catch((error) => {
                alert("Wrong credentials, Try again");
                console.log(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(form);
    };

    const loginUserAsGuest = (e) => {
        e.preventDefault();
        
        const guestCredentials = {
            email: "guest@gmail.com",
            password: "guest@gmail.com",
        };
        loginUser(guestCredentials);
    };

    return (
        <>
            <div className="flex md:flex-row flex-col-reverse min-h-screen items-center place-items-center">
                <div className="md:flex justify-center flex-1 hidden">
                    <img src={require("../assets/signup.jpg")} alt="" className="object-cover max-w-[700px] w-full" />
                </div>
                <div className="w-full max-w-md p-10 rounded-lg flex-1 flex flex-col justify-center md:mr-20">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={require("../assets/logo.png")}
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className=" flex gap-2 mt-2 text-center justify-center text-sm text-gray-600">
                            Or
                            <span
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                start your 14-day free trial
                            </span>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Email address"
                                    value={form.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center gap-2">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-0 outline-none"/>
                                <label htmlFor="remember-me" className="block text-sm leading-normal text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <span className=" text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </span>
                        </div>

                        <div>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={loginUser}>
                                Sign in
                            </button>
                            <button className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 mt-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={loginUserAsGuest}>
                                Login as Guest
                            </button>
                            <p className="mt-2 text-center text-sm font-medium text-gray-500">
                                Don't have an account?
                                <Link to="/register" className="text-indigo-600 hover:text-indigo-500"> Create account </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
