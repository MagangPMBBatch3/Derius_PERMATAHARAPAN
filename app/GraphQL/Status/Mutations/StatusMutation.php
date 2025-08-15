<?php

namespace App\GraphQL\Status\Mutations;

use App\Models\Statuses\Statuses;  // Update import path

class StatusMutation
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