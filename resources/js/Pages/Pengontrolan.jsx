import Navbar from "@/Components/Navbar";
import Fan from "@/assets/svg/Fan";
import Lamp from "@/assets/svg/Lamp";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Pengontrolan = (props) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [lampu, setLampu] = useState("mati");
    const [kipas, setKipas] = useState("mati");
    const [mode, setMode] = useState("otomatis");
    const [switchDisable, setSwitchDisable] = useState(true);
    const [modeDisable, setModeDisable] = useState(false);

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const sendControl = async () => {
            setSwitchDisable(true);
            try {
                const data = { lampu: lampu, kipas: kipas };
                await axios.post(`${apiUrl}/control`, data);
            } catch (error) {
                console.error("sendControlError=>", error);
            } finally {
                if (mode == "manual") {
                    setTimeout(() => {
                        setSwitchDisable(false);
                    }, 500);
                }
            }
        };

        sendControl();
    }, [lampu, kipas]);

    useEffect(() => {
        if (mode == "manual") {
            setSwitchDisable(false);
        } else {
            setKipas("mati");
            setLampu("mati");
            setSwitchDisable(true);
        }

        const sendMode = async () => {
            setModeDisable(true);
            try {
                await axios.post(`${apiUrl}/mode`, {
                    mode: mode,
                });
            } catch (error) {
                console.error("sendModeError=>", error);
            } finally {
                setModeDisable(false);
            }
        };

        sendMode();
    }, [mode]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
            <Head title="Pengontrolan" />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen flex justify-center items-center gap-8 relative">
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
                {loading ? (
                    <span className="loading loading-ring loading-lg"></span>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <div className="flex flex-col justify-center items-center">
                            Mode
                            <label className="flex cursor-pointer gap-2">
                                <span className="label-text">otomatis</span>
                                <input
                                    type="checkbox"
                                    checked={mode == "otomatis" ? false : true}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setMode("manual")
                                            : setMode("otomatis")
                                    }
                                    className="toggle theme-controller"
                                    disabled={modeDisable}
                                />
                                <span className="label-text">manual</span>
                            </label>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-8">
                            <div className="flex flex-col justify-center items-center">
                                Lampu
                                <label className="flex cursor-pointer gap-2">
                                    <span className="label-text">off</span>
                                    <input
                                        type="checkbox"
                                        checked={
                                            lampu == "hidup" ? true : false
                                        }
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setLampu("hidup")
                                                : setLampu("mati")
                                        }
                                        className="toggle theme-controller"
                                        disabled={switchDisable}
                                    />
                                    <span className="label-text">on</span>
                                </label>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                Kipas
                                <label className="flex cursor-pointer gap-2">
                                    <span className="label-text">off</span>
                                    <input
                                        type="checkbox"
                                        checked={
                                            kipas == "hidup" ? true : false
                                        }
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setKipas("hidup")
                                                : setKipas("mati")
                                        }
                                        className="toggle theme-controller"
                                        disabled={switchDisable}
                                    />
                                    <span className="label-text">on</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-8 h-full w-full">
                            <Lamp lampu={lampu} />
                            <Fan kipas={kipas} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Pengontrolan;
