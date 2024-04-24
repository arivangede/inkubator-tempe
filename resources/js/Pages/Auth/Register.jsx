import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

const Register = (props) => {
    const [form, setForm] = useState({
        username: "",
        full_name: "",
        password: "",
    });

    const [error, setError] = useState({});

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            username: form.username,
            full_name: form.full_name,
            password: form.password,
        };
        router.post("/register", data);
        console.log(data);
    };

    console.log(props);

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex flex-col justify-center items-center">
                <form
                    onSubmit={handleRegister}
                    className="p-4 flex flex-col justify-center items-center gap-4 border border-slate-200 shadow-md rounded-xl"
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
