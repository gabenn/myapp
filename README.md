# Recipe Application

I have used a Laravel/Inertia/React boilerplate with breeze authentication and a Docker environment.

## Tech Stack

- **Backend**: Laravel
- **Frontend**: React, Inertia.js
- **Database**: MySQL
- **Environment**: Docker with Laravel Sail

## Requirements

- Docker
- Node.js and NPM

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:gabenn/myapp.git
   cd myapp
   ```

2. Start the Docker environment:
   ```bash
   ./vendor/bin/sail up -d
   ```

3. Install PHP dependencies:
   ```bash
   ./vendor/bin/sail composer install
   ```

4. Install JavaScript dependencies:
   ```bash
   npm install
   ```

5. Create the database tables:
   ```bash
   ./vendor/bin/sail artisan migrate
   ```

6. Create a default admin user:
   ```bash
   ./vendor/bin/sail artisan db:seed
   ```

7. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
8. Generate the application key:
   ```bash
    ./vendor/bin/sail artisan key:generate
    ```
   
9. Configure the `.env` file with database credentials.
    ```
    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=laravel
    DB_USERNAME=root
    DB_PASSWORD=
    ```
    
10. Start Vite development server:
   ```bash
   npm run dev
   ```

## Synchronizing Recipes

Manual synchronization.
```bash
./vendor/bin/sail artisan app:sync-meals
```

Synchronize single category.

```bash
./vendor/bin/sail artisan app:sync-meals --category=Seafood
```

I have also implemented a daily synchronization at midnight.

## Usage

1. Open your browser at `http://localhost`
2. Log in with the default admin account:
   - Email: admin@admin.pl
   - Password: admin123
3. Browse recipes, search by title, view recipe details
4. Add recipes to favorites by clicking the heart icon
5. Access your favorite recipes from the "Favorite Recipes" menu
6. Add comments to recipes

## License

This project is licensed under the MIT License.
