<?php

namespace App\Http\Controllers;

use App\Models\Iot;
use Illuminate\Http\Request;

class IotController extends Controller
{
    public function receiveData(Request $request)
    {
        $temperature = $request->input('temperature');
        $humidity = $request->input('humidity');

        // Simpan data ke database atau lakukan tindakan lainnya
        Iot::create([
            'suhu' => $temperature,
            'kelembaban' => $humidity,
        ]);

        // Mengembalikan respons
        return response()->json(['message' => 'Data diterima dengan sukses'], 200);
    }
}
