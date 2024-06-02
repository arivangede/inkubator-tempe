import Navbar from "@/Components/Navbar";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import kelembabanImg from "@/assets/Kelembaban.png";
import suhuImg from "@/assets/Suhu.png";

const Snk = (props) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);
    const [suhu, setSuhu] = useState(0);
    const [kelembaban, setKelembaban] = useState(0);
    const sPercentage = Math.floor((suhu / 50) * 100);
    const kPercentage = Math.floor((kelembaban / 80) * 100);

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    let suhuColor;
    let kelembabanColor;

    if (suhu <= 26) {
        suhuColor = "bg-sky-500";
    } else if (suhu > 26 && suhu <= 37) {
        suhuColor = "bg-yellow-500";
    } else {
        suhuColor = "bg-red-500";
    }

    if (kelembaban <= 60) {
        kelembabanColor = "bg-red-500";
    } else if (kelembaban > 60 && kelembaban <= 65) {
        kelembabanColor = "bg-yellow-500";
    } else {
        kelembabanColor = "bg-sky-500";
    }

    // get data suhu dan kelembaban terkini
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/data-sensor`);
                setSuhu(response.data.data.suhu);
                setKelembaban(response.data.data.kelembaban);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const handleNetworkChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener("online", handleNetworkChange);
        window.addEventListener("offline", handleNetworkChange);

        return () => {
            window.removeEventListener("online", handleNetworkChange);
            window.removeEventListener("offline", handleNetworkChange);
        };
    }, []);

    return (
        <>
            <Head title="Monitoring" />
            <Navbar user={props.auth.user} />
            <div className="w-full flex flex-col justify-center items-center pt-8 pb-16 min-h-screen relative">
                <div
                    role="alert"
                    className={`alert alert-warning max-w-80 absolute top-0 z-10 lg:right-4 scale-0 transition ease-in-out origin-top duration-500 ${
                        !isOnline && "scale-100"
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
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>Tidak ada koneksi internet!</span>
                </div>
                <img
                    src={suhuImg}
                    alt="suhuImg"
                    className="absolute -left-12 w-1/2 opacity-50 z-0 object-contain"
                />
                <img
                    src={kelembabanImg}
                    alt="kelembabanImg"
                    className="absolute -right-12 w-1/2 opacity-50 z-0 object-contain"
                />
                <div className="flex justify-center items-center gap-8 z-10 ">
                    <div className="flex flex-col justify-center items-center w-20">
                        <div className="block h-80 w-10 border-4 border-slate-300 rounded-full overflow-hidden relative">
                            <div
                                className={`block ${suhuColor} transition-all ease-in-out duration-1000 absolute bottom-0`}
                                style={{
                                    width: "100%",
                                    height: sPercentage + "%",
                                }}
                            ></div>
                        </div>
                        <h1>Suhu</h1>
                        <p>{suhu}°C</p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-20">
                        <div className="block h-80 w-10 border-4 border-slate-300 rounded-full overflow-hidden relative">
                            <div
                                className={`block ${kelembabanColor} transition-all ease-in-out duration-1000 absolute bottom-0`}
                                style={{
                                    width: "100%",
                                    height: kPercentage + "%",
                                }}
                            ></div>
                        </div>
                        <h1>Kelembaban</h1>
                        <p>{kelembaban}% RH</p>
                    </div>
                </div>
                {loading && (
                    <div className="flex flex-col justify-center items-center bg-white border border-slate-200 rounded-xl shadow-md absolute p-8 z-20">
                        <span className="loading loading-ring loading-lg"></span>
                        <span>Menghubungkan...</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Snk;
