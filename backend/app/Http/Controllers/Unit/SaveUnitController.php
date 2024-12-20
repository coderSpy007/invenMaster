<?php
namespace App\Http\Controllers\Unit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Unit;

class SaveUnitController extends Controller
{
    public function saveUnit(Request $request)
    {
        $validated = $request->validate([
            'unitCode' => ['required','string','max:50',
                Rule::unique('unit', 'unit_code')->ignore($request->id),
            ],
            'unitName' => 'required|string|max:100',
            'id' => 'nullable|exists:unit,id',
        ]);

        if ($request->has('id') && $request->id !== null) {
            $unit = Unit::find($request->id);

            if (!$unit) {
                return response()->json([
                    'code' => 'error',
                    'message' => 'Unit Not Found',
                    'data' => null
                ]);
            }

            $unit->unit_code = $validated['unitCode'];
            $unit->unit_name = $validated['unitName'];
            $unit->save();

            return response()->json([
                'code' => 'success',
                'message' => 'Unit Updated successfully',
                'data' => $unit
            ]);
        }

        $existingUnit = Unit::where('unit_code', $validated['unitCode'])->first();
        if ($existingUnit) {
            return response()->json([
                'code' => 'error',
                'message' => 'Unit Code Duplicated',
                'data' => null
            ]);
        }

        $unit = new Unit();
        $unit->unit_code = $validated['unitCode'];
        $unit->unit_name = $validated['unitName'];
        $unit->save();

        return response()->json([
            'code' => 'success',
            'message' => 'Unit Saved successfully',
            'data' => $unit
        ]);
    }
}
