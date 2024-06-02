import AlertError from "@/Components/feedback/AlertError";
import AlertSuccess from "@/Components/feedback/AlertSuccess";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Login = (props) => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            router.post("/login", {
                username: form.username,
                password: form.password,
            });
        } catch (error) {
            console.log("LoginError=>", error);
        }
    };

    useEffect(() => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }, [props.errors, props.flash.message]);

    console.log(props);
    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen w-full flex flex-col justify-center items-center gap-4 relative">
                <div
                    role="alert"
                    className={`alert alert-success max-w-xs absolute top-4 scale-0 transition origin-top duration-300 ${
                        showAlert && props.flash.message ? "scale-100" : ""
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div className="flex flex-col justify-center items-center">
                        <span>{props.flash.message}</span>
                    </div>
                </div>

                <div
                    role="alert"
                    className={`alert alert-error max-w-xs absolute top-4 scale-0 transition origin-top duration-300 ${
                        showAlert && Object.keys(props.errors).length > 0
                            ? "scale-100"
                            : ""
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div className="flex flex-col justify-center items-center">
                        {Object.values(props.errors).map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}
                    </div>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="p-4 flex flex-col justify-center items-center gap-4 rounded-xl"
                >
                    <h1 className="text-2xl font-bold">Login</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered"
                        onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        autoComplete="off"
                    />

                    <div className="w-full flex items-center justify-between">
                        <Link href="/register" className="underline">
                            Register
                        </Link>
                        <button
                            type="submit"
                            className="btn bg-transparent border-slate-400"
                        >
                            <h1 className="text-xl font-bold">Submit</h1>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
