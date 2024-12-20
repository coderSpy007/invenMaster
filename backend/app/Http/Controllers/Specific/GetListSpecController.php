<?php

namespace App\Http\Controllers\Specific;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Spec;

class GetListSpecController extends Controller
{
    public function getListSpec(Request $request)
    {
        $spec = DB::table('spec as s')
        ->join('category as c', 's.category_id', '=', 'c.id')
        ->selectRaw('s.id, c.id as "categoryId", c.category_name as "categoryName", s.spec_value as "specValue"')
        ->orderBy('c.category_code', 'asc')
        ->get();
        return response()->json($spec);
    }
}


