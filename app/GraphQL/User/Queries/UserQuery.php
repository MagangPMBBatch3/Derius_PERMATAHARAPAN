<?php

namespace App\GraphQL\User\Queries;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserQuery
{
    public function allArsip($rootValue, array $args)
    {
        return User::onlyTrashed()->get();
    }

    public function me($rootValue, array $args)
    {
        return Auth::user()->load('profile');
    }
}
