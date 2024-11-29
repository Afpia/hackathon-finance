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

    public function login(array $credentials): array
    {
        $user = $this->checkUser($credentials['email']);

        if ($user && Hash::check($credentials['password'], $user->password)) {
            return [
                'access_token' => $user->createToken('api_token')->plainTextToken,
                'user' => $user,
            ];
        }

        return ['message' => 'Invalid credentials'];
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
