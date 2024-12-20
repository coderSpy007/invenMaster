<?php

namespace App\Http\Controllers\Specific;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class GetCategoryIdController extends Controller
{
    public function getCategoryId(Request $request)
    {
        $categoryId = DB::table('category as c')
        ->selectRaw('c.id as value, c.category_name as text')
        ->orderBy('c.category_code', 'asc')
        ->get();
        return response()->json($categoryId);
    }
}