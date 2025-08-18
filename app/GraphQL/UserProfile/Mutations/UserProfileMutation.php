<?php

namespace App\GraphQL\UserProfile\Mutations;

use App\Models\UsersProfile\UsersProfile;

class UserProfileMutation
{
    public function restore($_, array $args): ?UsersProfile
    {
        $profile = UsersProfile::withTrashed()->find($args['id']);
        if ($profile) {
            $profile->restore();
            return UsersProfile::find($args['id']);
        }
        return null;
    }

    public function forceDelete($_, array $args): ?UsersProfile
    {
        $profile = UsersProfile::withTrashed()->find($args['id']);
        if ($profile) {
            $profile->forceDelete();
            return $profile;
        }
        return null;
    }
}