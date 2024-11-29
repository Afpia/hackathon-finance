<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    private $authService;

    public function __consruct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function store(AuthService $authService, Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', Rules\Password::defaults()],
        ]);

        return response()->json(
            $authService->register($validated)
        , 201);
    }
}
