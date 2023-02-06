<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\ResponseFactory;

class MainController extends Controller {
    public function home(): Response|ResponseFactory {
        return inertia('Index', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Home'],
            ],
        ]);
    }
}
