<?php 

namespace App\GraphQL\Level\Queries;

use App\Models\Level\Level;

class LevelQuery
{
    public function allArship($_, array $args)
    {
        return Level::onlyTrashed()->get();
    }
}