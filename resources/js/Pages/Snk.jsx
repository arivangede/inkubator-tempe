import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Snk = (props) => {
    const [loading, setLoading] = useState(true);
    const [suhu, setSuhu] = useState(0);
    const [kelembaban, setKelembaban] = useState(20);
    const sPercentage = Math.floor((suhu / 50) * 100) + "%";
    const kPercentage = Math.floor((kelembaban / 80) * 100) + "%";

    let colorClass;

    if (suhu <= 26) {
        colorClass = "bg-sky-500";
    } else if (suhu > 26 && suhu <= 35) {
        colorClass = "bg-yellow-500";
    } else {
        colorClass = "bg-red-500";
    }

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return (
        <>
            <Head title="Monitoring" />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen flex justify-center items-center gap-8">
                {loading ? (
                    <span className="loading loading-ring loading-lg"></span>
                ) : (
                    <>
                        <div className="flex flex-col justify-center items-center">
                            <div className="block h-80 w-10 border border-slate-600 rounded-full overflow-hidden relative">
                                <div
                                    className={`block ${colorClass} transition-all ease-in-out duration-1000 absolute bottom-0`}
                                    style={{
                                        width: "100%",
                                        height: sPercentage,
                                    }}
                                ></div>
                            </div>
                            <h1>Suhu</h1>
                            <p>{suhu}°C</p>
                            <button onClick={() => setSuhu(suhu + 3)}>+</button>
                            <button onClick={() => setSuhu(suhu - 3)}>-</button>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="block h-80 w-10 border border-slate-600 rounded-full overflow-hidden relative">
                                <div
                                    className={`block ${colorClass} transition-all ease-in-out duration-1000 absolute bottom-0`}
                                    style={{
                                        width: "100%",
                                        height: kPercentage,
                                    }}
                                ></div>
                            </div>
                            <h1>Kelembaban</h1>
                            <p>{kelembaban} RH</p>
                            <button
                                onClick={() => setKelembaban(kelembaban + 3)}
                            >
                                +
                            </button>
                            <button
                                onClick={() => setKelembaban(kelembaban - 3)}
                            >
                                -
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Snk;
