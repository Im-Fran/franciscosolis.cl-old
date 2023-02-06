<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IpLocation extends Model {
    use HasFactory;

    protected $fillable = [
        'id',
        'ip_address',
        'location_data',
        'updated_at',
    ];

    protected $casts = [
        'location_data' => 'array',
    ];

    protected $appends = [
        'country_name',
        'country_code',
        'region_name',
        'region_code',
        'city_name',
        'area_code',
        'time_zone',
        'location_string',
    ];

    public function ipAddress(): Attribute {
        return new Attribute(
            get: fn ($value) => decrypt($value),
            set: fn ($value) => encrypt($value)
        );
    }

    public function getCountryNameAttribute(): string {
        return $this->location_data['countryName'] ?? '';
    }

    public function getCountryCodeAttribute(): string {
        return $this->location_data['countryCode'] ?? '';
    }

    public function getRegionNameAttribute(): string {
        return $this->location_data['regionName'] ?? '';
    }

    public function getRegionCodeAttribute(): string {
        return $this->location_data['regionCode'] ?? '';
    }

    public function getCityNameAttribute(): string {
        return $this->location_data['cityName'] ?? '';
    }

    public function getAreaCodeAttribute(): string {
        return $this->location_data['areaCode'] ?? '';
    }

    public function getTimeZoneAttribute(): string {
        return $this->location_data['timeZone'] ?? '';
    }

    public function getLocationStringAttribute(): string {
        if (!$this->location_data) {
            return 'Unknown Location';
        }

        return "{$this->city_name}, {$this->region_name}, {$this->country_name}";
    }

    public static function get(?string $ip = null): IpLocation {
        if (!$ip) {
            $ip = config('location.testing.enabled') ? config('location.testing.ip') : request()->ip();
        }

        $ipLocation = self::firstOrCreate(['id' => sha1($ip)], ['ip_address' => $ip]);

        if ($ipLocation->location_data || $ipLocation->updated_at->diffInMinutes(now()) < 15) {
            return $ipLocation;
        }

        $loc = \Location::get($ip);
        if (!$loc) {
            $ipLocation->update(['updated_at' => now()]);

            return $ipLocation;
        }

        $loc = $loc->toArray();
        unset($loc['ip'], $loc['latitude'], $loc['longitude'], $loc['zipCode'], $loc['postalCode'], $loc['metroCode']);
        $ipLocation->update([
            'location_data' => $loc,
        ]);

        return $ipLocation;
    }
}
