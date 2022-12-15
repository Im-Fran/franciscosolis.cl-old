<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait HasProfilePhoto {
    /**
     * Updates the profile photo.
     *
     * @param \Illuminate\Http\UploadedFile|string $photo
     */
    public function updateProfilePhoto($photo)
    {
        tap($this->profile_photo_path, function($previous) use ($photo) {
            $this->forceFill([
                'profile_photo_path' => $photo === 'gravatar' ? 'gravatar' : $photo->storePublicly(
                    'profile-photos',
                    ['disk' => $this->profilePhotoDisk()]
                ),
            ])->save();

            if ($previous && $previous !== 'gravatar') {
                Storage::disk($this->profilePhotoDisk())->delete($previous);
            }
        });
    }

    /**
     * Deletes the profile photo.
     */
    public function deleteProfilePhoto()
    {
        if (is_null($this->profile_photo_path)) {
            return;
        }

        Storage::disk($this->profilePhotoDisk())->delete($this->profile_photo_path);

        $this->forceFill([
            'profile_photo_path' => null,
        ])->save();
    }

    /**
     * Get the URL to the profile photo.
     *
     * @return string
     */
    public function getProfilePhotoUrlAttribute()
    {
        return $this->profile_photo_path ? ($this->profile_photo_path === 'gravatar' ? ('https://www.gravatar.com/avatar/'.md5(strtolower($this->gravatar_email ?? $this->email)).'?s=200') : Storage::disk($this->profilePhotoDisk())->url($this->profile_photo_path)) : $this->defaultProfilePhotoUrl();
    }

    /**
     * Get the default profile photo URL if no profile photo has been uploaded.
     *
     * @return string
     */
    protected function defaultProfilePhotoUrl()
    {
        $name = trim(collect(explode(' ', $this->name))->map(function($segment) {
            return mb_substr($segment, 0, 1);
        })->join(' '));

        return 'https://ui-avatars.com/api/?name='.urlencode($name).'&color=7F9CF5&background=EBF4FF';
    }

    /**
     * Get the disk that profile photos should be stored on.
     *
     * @return string
     */
    protected function profilePhotoDisk()
    {
        return isset($_ENV['VAPOR_ARTIFACT_NAME']) ? 's3' : config('app.profile_photo_disk', 'public');
    }
}
