<?php

namespace App\Helpers;

use App\Models\IpLocation;
use App\Notifications\Account\LoginNotification;
use Carbon\Carbon;
use DeviceDetector\DeviceDetector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class Helpers {
    public static function repeat($times, $callback): void {
        if ($callback) {
            for ($i = 0; $i < $times; ++$i) {
                $callback($i);
            }
        }
    }

    public static function getDeviceString(?string $header = null): string {
        $device = $header ?: (request()->header('User-Agent') ?: 'Unknown Device');
        if ($device != 'Unknown Device') {
            $deviceDetector = new DeviceDetector($device);
            $deviceDetector->parse();
            if ($deviceDetector->isBot()) {
                $device = 'Bot';
            } else {
                $browserClient = $deviceDetector->getClient('name').' ('.$deviceDetector->getClient('version').')';
                $deviceClient = $deviceDetector->getOs('name');
                $device = $browserClient.' on '.$deviceClient;
            }
        }

        return $device;
    }

    public static function authenticate(Request $request): void {
        Auth::loginUsingId(Session::get('auth.user.id'), Session::get('auth.user.remember'));
        $request->session()->regenerate();

        $location = IpLocation::get();

        Auth::user()->notify(new LoginNotification($location->ip_address, self::getDeviceString(), $location->location_string));
    }

    public static function isMobile(): bool {
        if (array_key_exists('HTTP_USER_AGENT', $_SERVER)) {
            $useragent = $_SERVER['HTTP_USER_AGENT'] ?: request()->header('User-Agent');

            return (new DeviceDetector($useragent))->isMobile();
        }

        return true;
    }

    public static function generateRecoveryCode(): string {
        return Str::random(6).'.'.Str::random(4).'.'.Str::random(6).'.'.Str::random(4);
    }

    // Parses the given date using carbon, but also caches the result to improve performance
    public static function carbon($date) {
        return $date != null ? Cache::rememberForever('carbon-'.md5($date), fn () => Carbon::parse($date)) : null;
    }
}
