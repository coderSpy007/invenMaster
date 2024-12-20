<?php

namespace App\Http\Controllers;

use App\Models\Store; 
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function getStoreByUserId(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',  
        ]);

        $stores = Store::where('user_id', $validated['user_id'])
                ->select('id', 'store_name')
                ->get();

        return response()->json($stores);
    }
}
