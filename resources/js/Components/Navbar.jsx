import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";

import hamburger from "@/assets/icon/hamburger.svg";

const Navbar = ({ user }) => {
    const [popMenu, setPopMenu] = useState(false);
    const [popProfil, setPopProfil] = useState(false);

    const handlePopupMenu = () => {
        setPopMenu(!popMenu);
    };
    const handlePopupProfil = () => {
        setPopProfil(!popProfil);
    };

    const handleLogout = () => {
        router.post("/logout");
    };
    return (
        <div className="navbar bg-base-100 relative z-50">
            <div className="flex-1">
                <Link className="text-xl font-bold px-4" href="/">
                    Inkubator Tempe
                </Link>
            </div>
            <button
                onClick={handlePopupMenu}
                className="btn btn-ghost sm:hidden"
            >
                <img src={hamburger} alt="menu" className="h-8 w-8" />
            </button>
            <div
                className={`${
                    popMenu == false ? "scale-0" : "scale-100"
                } bg-white border border-slate-400 transition origin-top-right p-4 rounded-lg shadow-md flex justify-center items-center absolute top-full flex-col right-0 gap-4 sm:gap-8 sm:static sm:flex-row sm:scale-100 sm:shadow-none`}
            >
                <Link href="/" className="hover:text-blue-800">
                    Beranda
                </Link>
                <Link
                    href="/suhu-dan-kelembaban"
                    className="hover:text-blue-800"
                >
                    Suhu & Kelembaban
                </Link>
                <Link href="/pengontrolan" className="hover:text-blue-800">
                    Pengontrolan
                </Link>

                <div className="sm:hidden bg-slate-200 w-full h-full py-4 rounded-md">
                    <div
                        className={`flex flex-col justify-center items-center`}
                    >
                        <div className="leading-4">
                            <h3>{user.full_name}</h3>
                            <h4 className="font-bold">{user.username}</h4>
                        </div>
                        <button onClick={handleLogout} className="btn mt-4">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <button onClick={handlePopupProfil} className="btn">
                        Profil
                    </button>
                    <div
                        className={`${
                            popProfil == false ? "scale-0" : "scale-100 "
                        } bg-white border border-slate-400 flex transition origin-top-right flex-col justify-center items-center sm:absolute sm:top-full sm:right-0 sm:shadow-md sm:rounded-md sm:px-8 sm:py-4`}
                    >
                        <div className="leading-4">
                            <h3>{user.full_name}</h3>
                            <h4 className="font-bold">{user.username}</h4>
                        </div>
                        <button onClick={handleLogout} className="btn mt-4">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
