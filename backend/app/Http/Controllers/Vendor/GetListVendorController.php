<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Vendor;

class GetListVendorController extends Controller
{
    public function getListVendor(Request $request)
    {
        $storeId = $request->query('store_id');
        
        if (!$storeId) {
            return response()->json(['message' => 'Store ID is required.'], 400);
        }

        $vendor = DB::table('vendor as v')
            ->selectRaw('v.id, v.vendor_code as "vendorCode", v.vendor_name as "vendorName",
                v.address as "address", v.email as "email", v.phone_number as "phoneNumber"')
            ->where('v.store_id', '=', $storeId)  
            ->orderBy('v.vendor_code', 'asc')
            ->get();

        return response()->json($vendor);
    }
}



