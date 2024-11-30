<?php

namespace App\Services;

use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\Hash;

class AuthService extends BaseService
{
    private $financeRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->repo = $authRepository;
    }

    public function checkUser($email)
    {
        return $this->repo->find($email);
    }

    public function login(array $credentials)
    {
        if (auth()->attempt($credentials)) {
            return auth()->user()->createToken('auth_token')->plainTextToken;
        }

        throw new \Exception('Invalid credentials');
    }

    public function register(array $input)
    {
        $user = $this->repo->create($input);

        return [
            'access_token' => $user->createToken('api_token')->plainTextToken,
            'user' => $user,
        ];
    }
}
