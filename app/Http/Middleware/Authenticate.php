<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return to_route('login'); // Redirect ke halaman login jika pengguna belum terotentikasi
        }

        return $next($request);
    }
}
