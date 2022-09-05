<?php

namespace App\Exceptions;

use Carbon\Carbon;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Support\ViewErrorBag;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    private array $errorMessages = [
        400 => 'Sorry but it looks like you made a mistake. Please try again.',
        401 => 'Sorry but it looks like you are not authorized to view this page.',
        403 => 'Sorry but it looks like you need more permissions to view this page.',
        404 => 'Sorry but it looks like you are looking for something that does not exist.',
        405 => 'Sorry but it looks like you are not authorized to view this page.',
        500 => 'Sorry but it looks like something went wrong on our end. Please try again.',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register() {
        $this->renderable(function(HttpExceptionInterface $e, Request $request){
		    $code = $e->getStatusCode();
		    if($code === 419) {
                return back()->withErrors(['error' => 'Sorry but it looks like your session has expired. Please try again.']);
            } else if(!app()->isProduction() && in_array($code, array_keys($this->errorMessages))) {
                $headers = $request->headers;
                $headers->add($e->getHeaders());
                $data = [
                    'errors' => new ViewErrorBag,
                    'exception' => $e,
                    'data' => [
                        'host' => gethostname(),
                        'timestamp' => Carbon::now()->format('m/d/Y H:i:s'),
                        'code' => $code,
                        'message' => $e->getMessage() ?: $this->errorMessages[$code],
                    ],
                ];
                return inertia('Error', $data)->toResponse($request)->setStatusCode($code)->sendHeaders($headers);
            }
	    });
    }
}
