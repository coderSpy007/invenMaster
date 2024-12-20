<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class DeleteListCategoryController extends Controller
{
    public function deleteListCategory(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:category,id',  
        ]);

        $category = Category::find($request->id);

        try {
            if ($category) {
                $category->delete();
                return response()->json(['code' => 'success', 'message' => 'Category deleted successfully']);
            }
            
            return response()->json(['code' => 'error', 'message' => 'Category not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            $message = $e->getCode() === '23000' 
                ? 'Category cannot be deleted because it is being used by other records.'
                : 'An error occurred while deleting the category.';
            
            return response()->json(['code' => 'error', 'message' => $message], 400);
        }
        
    }
}
