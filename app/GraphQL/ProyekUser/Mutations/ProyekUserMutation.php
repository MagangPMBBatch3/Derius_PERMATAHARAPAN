<?php

namespace App\GraphQL\ProyekUser\Mutations;

use App\Models\ProyekUser\ProyekUser;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ProyekUserMutation
{
    public function restore($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $proyekUser = ProyekUser::withTrashed()->find($args['id']);
        if ($proyekUser) {
            $proyekUser->restore();
        }
        return $proyekUser;
    }

    public function forceDelete($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $proyekUser = ProyekUser::withTrashed()->find($args['id']);
        if ($proyekUser) {
            $proyekUser->forceDelete();
        }
        return $proyekUser;
    }
}
