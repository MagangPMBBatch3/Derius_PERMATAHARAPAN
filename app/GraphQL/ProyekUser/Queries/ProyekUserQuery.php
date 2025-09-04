<?php

namespace App\GraphQL\ProyekUser\Queries;

use App\Models\ProyekUser\ProyekUser;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ProyekUserQuery
{
    public function proyekUsersByUser($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return ProyekUser::where('users_profile_id', $args['users_profile_id'])->get();
    }
}
