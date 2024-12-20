<?php

namespace App\Http\Controllers\Unit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Unit;

class GetListUnitController extends Controller
{
    public function getListUnit(Request $request)
    {
        $unit = Unit::selectRaw('id as id, unit_code as "unitCode", unit_name as "unitName"')->get();

        return response()->json($unit);
    }
}
