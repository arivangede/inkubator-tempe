import React, { useState } from "react";
import dayjs from "dayjs";

const Table = ({ data }) => {
    // config pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPage = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="overflow-x-auto">
                {/* table */}
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Suhu (°C)</th>
                            <th>Kelembaban (RH)</th>
                            <th>Tanggal & Waktu</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <th>{indexOfFirstItem + index + 1}</th>
                                <td>{item.suhu}</td>
                                <td>{item.kelembaban}</td>
                                <td>
                                    {dayjs(item.created_at).format(
                                        "DD MMMM YYYY | HH:mm:ss"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* pagination */}
            </div>
            <div className="flex gap-4 items-center">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-outline"
                >
                    Previous
                </button>
                <span>
                    page: {currentPage} of {totalPage}
                </span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= data.length}
                    className="btn btn-outline"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
