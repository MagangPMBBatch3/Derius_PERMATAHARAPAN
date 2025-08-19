<?php

namespace App\GraphQL\User\Mutations;

use App\Models\User;

class UserMutation
{
    public function restore($_, array $args): ?User
    {
        $user = User::withTrashed()->find($args['id']);
        if ($user) {
            $user->restore();
            return User::find($args['id']);
        }
        return null;
    }

    public function forceDelete($_, array $args): ?User
    {
        $user = User::withTrashed()->find($args['id']);
        if ($user) {
            $user->forceDelete();
            return $user;
        }
        return null;
    }
}