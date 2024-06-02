import AlertError from "@/Components/feedback/AlertError";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Register = (props) => {
    const [form, setForm] = useState({
        username: "",
        full_name: "",
        password: "",
    });
    const [error, setError] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (Object.keys(props.errors).length > 0) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }, [props.errors]);

    const handleRegister = (e) => {
        e.preventDefault();
        try {
            const data = {
                username: form.username,
                full_name: form.full_name,
                password: form.password,
            };
            router.post("/register", data);
        } catch (error) {
            console.log("RegisterError=>", error);
        }
    };

    console.log(props);

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex flex-col justify-center items-center gap-4 relative">
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
                    onSubmit={handleRegister}
                    className="p-4 flex flex-col justify-center items-center gap-4 "
                >
                    <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered"
                        onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input input-bordered"
                        onChange={(e) =>
                            setForm({ ...form, full_name: e.target.value })
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
                    <div className="flex flex-col justify-center items-center">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`input input-bordered ${
                                error.confirmpass &&
                                "border-red-500 focus:outline-red-500 focus:border-red-500"
                            }`}
                            onChange={(e) => {
                                const pass = e.target.value;
                                if (pass !== form.password) {
                                    setError({
                                        confirmpass: "must match with password",
                                    });
                                } else {
                                    setError({
                                        confirmpass: null,
                                    });
                                }
                            }}
                            autoComplete="off"
                        />
                        {error.confirmpass && (
                            <span className="text-sm text-red-500">
                                {error.confirmpass}
                            </span>
                        )}
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                        <button
                            type="submit"
                            className="btn bg-transparent border-slate-400"
                        >
                            <h1 className="text-xl font-bold">Register</h1>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
