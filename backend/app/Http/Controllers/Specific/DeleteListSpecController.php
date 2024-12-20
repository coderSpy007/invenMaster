<?php

namespace App\Http\Controllers\Specific;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Spec;

class DeleteListSpecController extends Controller
{
    public function deleteListSpec(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:spec,id',  
        ]);

        $spec = Spec::find($request->id);

        try {
            if ($spec) {
                $spec->delete();
                return response()->json(['code' => 'success', 'message' => 'Spec deleted successfully']);
            }
            
            return response()->json(['code' => 'error', 'message' => 'Spec not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            $message = $e->getCode() === '23000' 
                ? 'Spec cannot be deleted because it is being used by other records.'
                : 'An error occurred while deleting the spec.';
            
            return response()->json(['code' => 'error', 'message' => $message], 400);
        }
        
    }
}
