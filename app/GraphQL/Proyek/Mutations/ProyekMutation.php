<?php

namespace App\GraphQL\Proyek\Mutations;

use App\Models\Proyek;

class ProyekMutation
{
    public function restore($_, array $args): ? \App\Models\Proyek\Proyek
    {
        $Proyek = \App\Models\Proyek\Proyek::withTrashed()->find($args['id']);
        if ($Proyek) {
            $Proyek->restore();
            return \App\Models\Proyek\Proyek::find($args['id']);
        }
        return null;
    }

    public function forceDelete($_, array $args): ?\App\Models\Proyek\Proyek
    {
        $Proyek = \App\Models\Proyek\Proyek::withTrashed()->find($args['id']);
        if ($Proyek) {
            $Proyek->forceDelete();
            return $Proyek;
        }
        return null;
    }

    private function getProyek($_, array $args)
    {
        $query = \App\Models\Proyek\Proyek::query();
        if (!empty($args['token'])) {
            $query->where('id', 'like', '%'.$args['token'].'%')
                  ->orWhere('nama', 'like', '%'.$args['token'].'%')
                  ->orWhere('kode', 'like', '%'.$args['token'].'%');
        }
        return $query->get();
    }
}