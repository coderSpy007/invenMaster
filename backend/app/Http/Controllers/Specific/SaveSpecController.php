<?php
namespace App\Http\Controllers\Specific;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Spec;

class SaveSpecController extends Controller
{
    public function saveSpec(Request $request)
    {
        $validated = $request->validate([
            'categoryId' => 'required|integer',
            'specValue' => ['required','string','max:50',
                Rule::unique('spec', 'spec_value')
                    ->where('category_id', $request->categoryId),
            ],
            'id' => 'nullable|exists:unit,id',
        ]);

        if ($request->has('id') && $request->id !== null) {
            $spec = Spec::find($request->id);

            if (!$spec) {
                return response()->json([
                    'code' => 'error',
                    'message' => 'Spec Not Found',
                    'data' => null
                ]);
            }

            $spec->category_id = $validated['categoryId'];
            $spec->spec_value = $validated['specValue'];
            $spec->save();

            return response()->json([
                'code' => 'success',
                'message' => 'Spec Updated successfully',
                'data' => $spec
            ]);
        }


        $spec = new Spec();
        $spec->category_id = $validated['categoryId'];
        $spec->spec_value = $validated['specValue'];
        $spec->save();

        return response()->json([
            'code' => 'success',
            'message' => 'Spec Saved successfully',
            'data' => $spec
        ]);
    }
}
