<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(AuthService $authService,Request $request): Response
    {
        $credentials = $request->only('email', 'password');

        try {
            $token = $authService->login($credentials);

            return response()->json(['access_token' => $token, 'user' => auth()->user()]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ошибка аутентификации'], 500);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
