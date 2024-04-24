import AlertError from "@/Components/feedback/AlertError";
import AlertSuccess from "@/Components/feedback/AlertSuccess";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

const Login = (props) => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const error = props.errors;
    const flash = props.flash;

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

    console.log(props);
    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex flex-col justify-center items-center gap-4">
                {error.login && (
                    <div className="max-w-sm">
                        <AlertError message={error.login} />
                    </div>
                )}
                {flash.message && (
                    <div className="max-w-sm">
                        <AlertSuccess message={flash.message} />
                    </div>
                )}
                <form
                    onSubmit={handleLogin}
                    className="p-4 flex flex-col justify-center items-center gap-4 border border-slate-200 shadow-md rounded-xl"
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
