<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//authen
use App\Http\Controllers\AuthController;

//storeData
use App\Http\Controllers\StoreController;

//category
use App\Http\Controllers\Category\SaveCategoryController;
use App\Http\Controllers\Category\GetListCategoryController;
use App\Http\Controllers\Category\DeleteListCategoryController;

//unit
use App\Http\Controllers\Unit\SaveUnitController;
use App\Http\Controllers\Unit\GetListUnitController;
use App\Http\Controllers\Unit\DeleteListUnitController;

//spec
use App\Http\Controllers\Specific\SaveSpecController;
use App\Http\Controllers\Specific\GetListSpecController;
use App\Http\Controllers\Specific\getCategoryIdController;
use App\Http\Controllers\Specific\DeleteListSpecController;

//unit
use App\Http\Controllers\Vendor\SaveVendorController;
use App\Http\Controllers\Vendor\GetListVendorController;
use App\Http\Controllers\Vendor\DeleteListVendorController;

//authen
Route::post('/login', [AuthController::class, 'login']);

//storeData
Route::get('/store', [StoreController::class, 'getStoreByUserId']);

//category
Route::post('/save-category', [SaveCategoryController::class, 'saveCategory']);
Route::get('/get-list-category', [GetListCategoryController::class, 'getListCategory']);
Route::delete('/delete-list-category', [DeleteListCategoryController::class, 'deleteListCategory']);

//unit
Route::post('/save-unit', [SaveUnitController::class, 'saveUnit']);
Route::get('/get-list-unit', [GetListUnitController::class, 'getListUnit']);
Route::delete('/delete-list-unit', [DeleteListUnitController::class, 'deleteListUnit']);

//spec
Route::post('/save-spec', [SaveSpecController::class, 'saveSpec']);
Route::get('/get-list-spec', [GetListSpecController::class, 'getListSpec']);
Route::get('/get-category-id', [getCategoryIdController::class, 'getCategoryId']);
Route::delete('/delete-list-spec', [DeleteListSpecController::class, 'deleteListSpec']);

//vendor
Route::post('/save-vendor', [SaveVendorController::class, 'saveVendor']);
Route::get('/get-list-vendor', [GetListVendorController::class, 'getListVendor']);
Route::delete('/delete-list-vendor', [DeleteListVendorController::class, 'deleteListVendor']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


