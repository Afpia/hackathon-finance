<?php

namespace App\Repositories;

use App\Models\User;

class AuthRepository extends BaseRepository
{
    protected $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function find($email)
    {
        return $this->model->where('email', $email)->first();
    }
}
