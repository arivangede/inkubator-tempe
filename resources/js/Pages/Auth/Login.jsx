import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

const Login = (props) => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleLogin = () => {
        try {
            router.post("/login", {
                username: form.username,
                password: form.password,
            });
        } catch (error) {
            console.log(error);
        }
    };

    console.log(props);
    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="p-4 flex flex-col justify-center items-center gap-4 border border-slate-200 shadow-md rounded-xl">
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
                    />

                    <div className="w-full flex items-center justify-between">
                        <Link href="/register" className="underline">
                            Register
                        </Link>
                        <button
                            onClick={handleLogin}
                            className="btn bg-transparent border-slate-400"
                        >
                            <h1 className="text-xl font-bold">Login</h1>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
