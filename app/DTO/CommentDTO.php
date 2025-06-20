<?php

namespace App\DTO;

class CommentDTO
{
    public string $content;
    public int $userId;
    public int $mealId;

    public function __construct(string $content, int $userId, int $mealId)
    {
        $this->content = $content;
        $this->userId = $userId;
        $this->mealId = $mealId;
    }

    public static function fromRequest(array $data, int $userId, int $mealId): self
    {
        return new self(
            trim($data['content']),
            $userId,
            $mealId
        );
    }

    public function toArray(): array
    {
        return [
            'content' => $this->content,
            'user_id' => $this->userId,
            'meal_id' => $this->mealId,
        ];
    }
}
