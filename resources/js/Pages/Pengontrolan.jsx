import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Pengontrolan = (props) => {
    const [loading, setLoading] = useState(true);
    const [lampu, setLampu] = useState(false);
    const [kipas, setKipas] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    }, []);
    return (
        <>
            <Head title="Pengontrolan" />
            <Navbar user={props.auth.user} />
            <div className="w-full flex justify-center items-center gap-8">
                {loading ? (
                    <span className="loading loading-ring loading-lg"></span>
                ) : (
                    <>
                        <div className="flex flex-col justify-center items-center">
                            Lampu
                            <label className="flex cursor-pointer gap-2">
                                <span className="label-text">off</span>
                                <input
                                    type="checkbox"
                                    value={lampu}
                                    checked={lampu == false ? false : true}
                                    onChange={() => setLampu(!lampu)}
                                    className="toggle theme-controller"
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
                                    value={kipas}
                                    checked={kipas == false ? false : true}
                                    onChange={() => setKipas(!kipas)}
                                    className="toggle theme-controller"
                                />
                                <span className="label-text">on</span>
                            </label>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Pengontrolan;
