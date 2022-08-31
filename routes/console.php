<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Output\BufferedOutput;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('franciscosolis:ide', function () {
	$this->info('Generating IDE helpers...');
	
	$bar = $this->output->createProgressBar(3);
	$bar->start();
	
	$outputBuffer = new BufferedOutput();
	
	Artisan::call('ide-helper:generate -n', [], $outputBuffer);
	$bar->advance();
	
	Artisan::call('ide-helper:models -n --nowrite', [], $outputBuffer); // -q (Quiet), -n (No Interaction), --nowrite (Don't write to Model file)
	$bar->advance();
	
	Artisan::call('ide-helper:meta -n', [], $outputBuffer);
	$bar->advance();
	
	$bar->finish();
	
	$this->line('');
	$this->info('Generated IDE Helpers!');
	$this->line('');
	
	
	$this->line($outputBuffer->fetch());
})->describe('Generate IDE helpers for the Website.');
