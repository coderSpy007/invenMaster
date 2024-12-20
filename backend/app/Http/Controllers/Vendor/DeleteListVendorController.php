<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vendor;

class DeleteListVendorController extends Controller
{
    public function deleteListVendor(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:vendor,id',  
        ]);

        $vendor = Vendor::find($request->id);

        try {
            if ($vendor) {
                $vendor->delete();
                return response()->json(['code' => 'success', 'message' => 'Vendor deleted successfully']);
            }
            
            return response()->json(['code' => 'error', 'message' => 'Vendor not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            $message = $e->getCode() === '23000' 
                ? 'vendor cannot be deleted because it is being used by other records.'
                : 'An error occurred while deleting the vendor.';
            
            return response()->json(['code' => 'error', 'message' => $message], 400);
        }
        
    }
}
