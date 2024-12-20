<?php

namespace App\Http\Controllers\Unit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Unit;

class DeleteListUnitController extends Controller
{
    public function deleteListUnit(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:unit,id',  
        ]);

        $unit = Unit::find($request->id);

        try {
            if ($unit) {
                $unit->delete();
                return response()->json(['code' => 'success', 'message' => 'Unit deleted successfully']);
            }
            
            return response()->json(['code' => 'error', 'message' => 'Unit not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            $message = $e->getCode() === '23000' 
                ? 'Unit cannot be deleted because it is being used by other records.'
                : 'An error occurred while deleting the unit.';
            
            return response()->json(['code' => 'error', 'message' => $message], 400);
        }
        
    }
}
