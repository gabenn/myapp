import React, { useState, useEffect } from 'react';

export default function FavoriteButton({ mealId, showText = false, className = '', onToggle = null }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');
        setIsFavorite(favorites.includes(mealId));
    }, [mealId]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');

        if (isFavorite) {
            const updatedFavorites = favorites.filter(id => id !== mealId);
            localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            favorites.push(mealId);
            localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
            setIsFavorite(true);
        }

        if (onToggle) {
            onToggle(mealId);
        }
    };

    const ariaLabel = isFavorite ? 'Remove from favorites' : 'Add to favorites';

    return (
        <button
            onClick={toggleFavorite}
            className={`focus:outline-none ${className}`}
            aria-label={ariaLabel}
            aria-pressed={isFavorite}
            type="button"
        >
            <span className="text-2xl" aria-hidden="true">{isFavorite ? '❤️' : '🤍'}</span>
            {showText && (
                <span className="text-sm ml-2">
                    {ariaLabel}
                </span>
            )}
        </button>
    );
}
