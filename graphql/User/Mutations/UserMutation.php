<?php

namespace App\GraphQL\User\Mutations;

use App\Models\User;

class UserMutation
{
    public function restore($rootValue, array $args)
    {
        $user = User::onlyTrashed()->findOrFail($args['id']);
        $user->restore();
        return $user;
    }

    public function forceDelete($rootValue, array $args)
    {
        $user = User::onlyTrashed()->findOrFail($args['id']);
        $user->forceDelete();
        return $user;
    }
} 