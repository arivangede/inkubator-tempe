<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\Iot;
use App\Models\Mode;
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

    public function displayData()
    {
        $data = Iot::orderBy('id', 'desc')->first();

        if ($data) {
            return response()->json(['data' => $data], 200);
        } else {
            return response()->json(['message' => 'tidak ada data di database'], 200);
        }
    }

    public function getAllData()
    {
        $data = Iot::orderBy('id', 'desc')->get();

        if ($data) {
            return response()->json(['data' => $data], 200);
        } else {
            return response()->json(['message' => 'tidak ada data di database'], 200);
        }
    }

    public function getControl()
    {
        $command = Command::select('lampu', 'kipas')->orderBy('id', 'desc')->first();

        return response()->json(['command' => $command]);
    }

    public function writeControl(Request $request)
    {
        $commandLampu = $request->input('lampu');
        $commandKipas = $request->input('kipas');

        $lastState = Command::orderBy('id', 'desc')->first();

        if ($commandLampu == 'mati' && $commandKipas == 'mati' && $lastState->lampu == 'mati' && $lastState->kipas == 'mati') {
            return response()->json(['message' => 'Tidak menulis perintah karna perintah sebelumnya sama'], 301);
        }

        Command::create([
            'kipas' => $commandKipas,
            'lampu' => $commandLampu
        ]);

        return response()->json(['message' => 'Sukses menulis perintah']);
    }

    public function getMode()
    {
        $mode = Mode::select('mode')->orderBy('id', 'desc')->first();

        return response()->json(['mode' => $mode->mode]);
    }

    public function writeMode(Request $request)
    {
        $mode = $request->input('mode');

        $lastState = Mode::orderBy('id', 'desc')->first();

        if ($mode == 'otomatis' && $lastState->mode == 'otomatis') {
            return response()->json(['message' => 'Tidak menulis mode karna perintah sebelumnya sama'], 301);
        }

        Mode::create([
            'mode' => $mode,
        ]);

        return response()->json(['message' => 'Sukses menulis Mode']);
    }
}
