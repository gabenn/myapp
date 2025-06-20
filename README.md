# Recipe Application

## Tech Stack

- **Backend**: Laravel
- **Frontend**: React, Inertia.js
- **Database**: MySQL
- **Environment**: Docker with Laravel Sail

## Requirements

- Docker
- PHP (for local development without Docker)
- Composer
- Node.js and NPM

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
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
   ./vendor/bin/sail npm install
   ```

5. Create the database tables:
   ```bash
   ./vendor/bin/sail artisan migrate
   ```

6. Create a default admin user:
   ```bash
   ./vendor/bin/sail artisan db:seed
   ```

7. Start Vite development server:
   ```bash
   ./vendor/bin/sail npm run dev
   ```

## Synchronizing Recipes

To manually synchronize recipes from TheMealDB API:

```bash
./vendor/bin/sail artisan app:sync-meals
```

To synchronize recipes from a specific category:

```bash
./vendor/bin/sail artisan app:sync-meals --category=Seafood
```

The application also automatically synchronizes recipes daily at midnight through Laravel's task scheduler.

## Usage

1. Open your browser and navigate to `http://localhost`
2. Log in with the default admin account:
   - Email: admin@admin.pl
   - Password: admin123
3. Browse recipes, search by title, view recipe details
4. Add recipes to favorites by clicking the heart icon
5. Access your favorite recipes from the "Favorite Recipes" menu
6. Add comments to recipes

## Project Structure

- `app/Models`: Database models (Meal, Comment, User)
- `app/Http/Controllers`: Application controllers
- `app/Console/Commands`: Custom Artisan commands including recipe synchronization
- `resources/js/Pages`: React components for the frontend
- `resources/js/Components`: Reusable React components
- `database/migrations`: Database structure

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
