<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IotController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// rute halaman
Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Beranda');
    })->name('beranda');
    Route::get('/suhu-dan-kelembaban', function () {
        return Inertia::render('Snk');
    })->name('snk');
    Route::get('/pengontrolan', function () {
        return Inertia::render('Pengontrolan');
    })->name('pengontrolan');
});

// rute iot
Route::post('/post-data', [IotController::class, 'receiveData']);
Route::get('/data-sensor', [IotController::class, 'displayData']);
Route::get('/data-histori', [IotController::class, 'getAllData']);

Route::post('/control', [IotController::class, 'writeControl']);
Route::get('/control', [IotController::class, 'getControl']);

Route::get('/mode', [IotController::class, 'getMode']);
Route::post('/mode', [IotController::class, 'writeMode']);

// rute autentikasi user
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
Route::post(
    '/login',
    [AuthController::class, 'login']
);

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');
Route::post(
    '/register',
    [AuthController::class, 'register']
);

Route::post(
    '/logout',
    [AuthController::class, 'logout']
);
