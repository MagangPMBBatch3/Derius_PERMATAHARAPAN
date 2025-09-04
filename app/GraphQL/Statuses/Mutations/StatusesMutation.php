<?php

namespace App\GraphQL\Statuses\Mutations;

use App\Models\Statuses\Statuses;

class StatusesMutation
{
    public function restore($_, array $args)
    {
        $status = Statuses::withTrashed()->findOrFail($args['id']);
        $status->restore();
        return $status;
    }

    public function forceDelete($_, array $args)
    {
        $status = Statuses::withTrashed()->findOrFail($args['id']);
        $status->forceDelete();
        return $status;
    }
} 