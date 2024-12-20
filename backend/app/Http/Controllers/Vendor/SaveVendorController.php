<?php
namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Vendor;

class SaveVendorController extends Controller
{
    public function saveVendor(Request $request)
    {
        $validated = $request->validate([
            'vendorCode' => ['required','string','max:50',
                Rule::unique('vendor', 'vendor_code')->ignore($request->id),
            ],
            'vendorName' => 'required|string|max:100',
            'address' => 'required|string|max:200',
            'email' => 'required|string|max:50',
            'phoneNumber' => 'required|string|max:30',
            'storeId' => 'required|integer',
            'id' => 'nullable|exists:vendor,id',
        ]);

        if ($request->has('id') && $request->id !== null) {
            $vendor = Vendor::find($request->id);

            if (!$vendor) {
                return response()->json([
                    'code' => 'error',
                    'message' => 'Vendor Not Found',
                    'data' => null
                ]);
            }

            $vendor->vendor_code = $validated['vendorCode'];
            $vendor->vendor_name = $validated['vendorName'];
            $vendor->address = $validated['address'];
            $vendor->email = $validated['email'];
            $vendor->phone_number = $validated['phoneNumber'];
            $vendor->store_id = $validated['storeId'];
            $vendor->save();

            return response()->json([
                'code' => 'success',
                'message' => 'Vendor Updated successfully',
                'data' => $vendor
            ]);
        }


        $vendor = new Vendor();
        $vendor->vendor_code = $validated['vendorCode'];
        $vendor->vendor_name = $validated['vendorName'];
        $vendor->address = $validated['address'];
        $vendor->email = $validated['email'];
        $vendor->phone_number = $validated['phoneNumber'];
        $vendor->store_id = $validated['storeId'];
        $vendor->save();

        return response()->json([
            'code' => 'success',
            'message' => 'Vendor Saved successfully',
            'data' => $vendor
        ]);
    }
}
