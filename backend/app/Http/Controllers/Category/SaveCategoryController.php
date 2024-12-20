<?php
namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class SaveCategoryController extends Controller
{
    public function saveCategory(Request $request)
    {
        $validated = $request->validate([
            'categoryCode' => 'required|string|max:50|unique:category,category_code,' . ($request->id ?? 'NULL'),
            'categoryName' => 'required|string|max:100',
            'id' => 'nullable|exists:category,id',
        ]);

        if ($request->has('id') && $request->id !== null) {
            $category = Category::find($request->id);

            if (!$category) {
                return response()->json([
                    'code' => 'error',
                    'message' => 'Category Not Found',
                    'data' => null
                ]);
            }

            $category->category_code = $validated['categoryCode'];
            $category->category_name = $validated['categoryName'];
            $category->save();

            return response()->json([
                'code' => 'success',
                'message' => 'Category Updated successfully',
                'data' => $category
            ]);
        }

        $existingCategory = Category::where('category_code', $validated['categoryCode'])->first();
        if ($existingCategory) {
            return response()->json([
                'code' => 'error',
                'message' => 'Category Code Duplicated',
                'data' => null
            ]);
        }

        $category = new Category();
        $category->category_code = $validated['categoryCode'];
        $category->category_name = $validated['categoryName'];
        $category->save();

        return response()->json([
            'code' => 'success',
            'message' => 'Category Saved successfully',
            'data' => $category
        ]);
    }
}
