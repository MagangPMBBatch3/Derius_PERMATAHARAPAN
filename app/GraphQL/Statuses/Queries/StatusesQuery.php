<?php 

namespace App\GraphQL\Statuses\Queries;

use App\Models\Statuses\Statuses;

class StatusesQuery
{
    public function allArship($_, array $args)
    {
        return Statuses::onlyTrashed()->get();
    }
} 