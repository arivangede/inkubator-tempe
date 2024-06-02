import Navbar from "@/Components/Navbar";
import Table from "@/Components/Table";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Beranda = (props) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // get data histori
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/data-histori`);
                setData(response.data.data);
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
            <Head title="Beranda" />
            <Navbar user={props.auth.user} />
            <div className="w-full flex flex-col justify-center items-center gap-8 pt-8 pb-16 min-h-screen sm:min-h-0 relative">
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
                ) : data.length > 0 ? (
                    <Table data={data} />
                ) : (
                    <span>Tidak ada data di database</span>
                )}
            </div>
        </>
    );
};

export default Beranda;
