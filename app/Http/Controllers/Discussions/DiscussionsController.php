<?php

namespace App\Http\Controllers\Discussions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DiscussionsController extends Controller {

    public function index() {
        return inertia('Discussions/Index');
    }
}
