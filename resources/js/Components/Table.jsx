import React from "react";

const Table = () => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Suhu (°C)</th>
                        <th>Kelembaban (RH)</th>
                        <th>Tanggal & Waktu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>18</td>
                        <td>40</td>
                        <td>24-04-2024 21:00:00</td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>18</td>
                        <td>40</td>
                        <td>24-04-2024 21:00:00</td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>18</td>
                        <td>40</td>
                        <td>24-04-2024 21:00:00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
