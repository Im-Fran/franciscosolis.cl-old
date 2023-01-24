# Setting Up Development Environment
> **NOTE**
> The `/` path is the project root.

1. Make sure you have docker desktop installed.
2. Make sure to have php installed. The version used by the project can be found here (is recommended to use [brew](https://brew.sh/) with tap [shivammathur/homebrew-php](https://github.com/shivammathur/homebrew-php)): `/.phpver`. You can install it like this: `brew tap shivammathur/php && brew install shivammathur/php/php@8.1`
3. Make sure you have [composer](https://getcomposer.org/download/) installed. Is recommended to use brew to install it. You can install it like this: `brew install composer`
4. Make sure you have node installed. The version used by the project can be found here (is recommended to use [nvm](https://github.com/nvm-sh/nvm)): `/.nvmrc`. It's recommended to install it from the official repo: [nvm-sh/nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
5. Make sure to enable yarn. You can do it by running the following command (after having node installed): `corepack enable`
6. Make sure you have installed [`gh`](https://cli.github.com/)
7. Setup the sail [shell alias](https://laravel.com/docs/sail#configuring-a-shell-alias)

Then you can use the following set of commands to configure the repo. You may write them manually but is recommended to first install the dependencies and later run these commands:
> **NOTE**
> This command was made thinking your at the parent folder of the website project. I usually locate the folder under `~/Development/Websites`, so later the folder will be `~/Development/Websites/franciscosolis.cl`. You may choose any folder as parent folder.
```sh
gh repo clone Im-Fran/franciscosolis.cl # Clone repo
cd franciscosolis.cl # Change dir to the repo
cp .env.example .env # Copy .example.env to .env.
composer install --no-scripts # Install php dependencies
php artisan key:generate # Generate secret to encrypt data (do not forget about it!)
sail build --no-cache # Build the sail container. Make sure you configured the shell alias! (Step 7)
sail up -d # Run the container in background
sail art optimize # If you want a faster load this will optimize the environment by caching lots of settings. If you have a permissions issue check below.
sail art migrate --seed # Migrate and seed database
```

### Permissions Issue
If you have issues with the file permissions here's something you can try:
```sh
sudo groupadd -f docker # Create the docker group
sudo usermod -aG docker $USER # Add docker to your groups
newgrp docker # Apply changes (is better to restart the server/computer)
# After restart run this:
sudo chgrp -R docker storage bootstrap/cache # Changes the group access to docker for the storage and bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache # Allows access to write, read and execute to user and group, but only read and execute to others.
```
