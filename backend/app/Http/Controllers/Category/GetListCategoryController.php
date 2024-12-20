<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class GetListCategoryController extends Controller
{
    public function getListCategory(Request $request)
    {
        // $categories = Category::select('id', 'category_code', 'category_name')->get();
        $categories = Category::selectRaw('id as id, category_code as "categoryCode", category_name as "categoryName"')->get();

        return response()->json($categories);
    }
}
