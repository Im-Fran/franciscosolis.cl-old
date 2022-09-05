<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\ViewErrorBag;
use Validator;

class MainController extends Controller {

    public function home(){
        return inertia('Index');
    }
}
