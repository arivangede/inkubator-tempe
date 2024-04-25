import Navbar from "@/Components/Navbar";
import Table from "@/Components/Table";
import { Head } from "@inertiajs/react";
import React from "react";

const Beranda = (props) => {
    console.log(props);
    return (
        <>
            <Head title="Beranda" />
            <Navbar user={props.auth.user} />
            <div className="w-full flex justify-center items-center gap-8">
                <Table />
            </div>
        </>
    );
};

export default Beranda;
