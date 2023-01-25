<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait HasProfilePhoto {
    /**
     * Updates the profile photo.
     *
     * @param \Illuminate\Http\UploadedFile|string $photo
     */
    public function updateProfilePhoto($photo) {
        tap($this->profile_photo_path, function($previous) use ($photo) {
			if($photo === 'gravatar') {
				$email = $this->gravatar_email ?? $this->email;
				$photo = "https://www.gravatar.com/avatar/" . md5(strtolower(trim($email)));
			} else if($photo === 'pixel') {
				$seed = urlencode($this->name . ' ' . \Str::random(8));
				$photo = "https://api.dicebear.com/5.x/pixel-art/svg?seed=$seed";
			} else {
				$photo = $photo->storePublicly(
					'profile-photos',
					['disk' => $this->profilePhotoDisk()]
				);
			}
			
			$this->forceFill(['profile_photo_path' => $photo])->save();

            if ($previous && Storage::disk($this->profilePhotoDisk())->exists($previous)) {
                Storage::disk($this->profilePhotoDisk())->delete($previous);
            }
        });
    }

    /**
     * Deletes the profile photo.
     */
    public function deleteProfilePhoto() {
        if (is_null($this->profile_photo_path)) {
            return;
        }

        Storage::disk($this->profilePhotoDisk())->delete($this->profile_photo_path);

        $this->forceFill(['profile_photo_path' => null])->save();
    }

    /**
     * Get the URL to the profile photo.
     *
     * @return string
     */
    public function getProfilePhotoUrlAttribute() {
		if($this->profile_photo_path && str_starts_with($this->profile_photo_path, 'http')) {
			return $this->profile_photo_path;
		}
		
		if($this->profile_photo_path && Storage::disk($this->profilePhotoDisk())->exists($this->profile_photo_path)) {
			return Storage::disk($this->profilePhotoDisk())->url($this->profile_photo_path);
		}
		
        return $this->defaultProfilePhotoUrl();
    }

    /**
     * Get the default profile photo URL if no profile photo has been uploaded.
     *
     * @return string
     */
    protected function defaultProfilePhotoUrl() {
        $name = urlencode($this->name);

        return "https://api.dicebear.com/5.x/pixel-art/svg?seed=$name";
    }

    /**
     * Get the disk that profile photos should be stored on.
     *
     * @return string
     */
    protected function profilePhotoDisk() {
        return isset($_ENV['VAPOR_ARTIFACT_NAME']) ? 's3' : config('app.profile_photo_disk', 'public');
    }
}
