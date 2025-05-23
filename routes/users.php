<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::resource('/users', UserController::class)
    //     ->names([
    //         'index' => 'users.index',
    //         'create' => 'users.create',
    //         'store' => 'users.store',
    //         'show' => 'users.show',
    //         'edit' => 'users.edit',
    //         'update' => 'users.update',
    //         'destroy' => 'users.destroy'
    //     ]);
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
});
