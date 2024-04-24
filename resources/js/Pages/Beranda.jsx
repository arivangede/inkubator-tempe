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
            <Table />
        </>
    );
};

export default Beranda;
