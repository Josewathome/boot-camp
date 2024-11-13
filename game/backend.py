# backend.py

import random

class FlappyBirdGame:
    def __init__(self):
        self.bird_y = 250      # Bird's starting position
        self.gravity = 3       # Gravity affecting bird's downward movement
        self.jump_force = -7   # Upward force when bird "flaps"
        self.pipes = []        # Holds pipe positions
        self.score = 0         # Initial score

    def update_game(self, flap):
        # Apply gravity to bird's position
        self.bird_y += self.gravity
        
        if flap:
            self.bird_y += self.jump_force
        
        # Move pipes to the left and add new ones as needed
        self.move_pipes()
        
        # Check for collisions
        if self.check_collision():
            return {"game_over": True, "score": self.score}
        
        # Return current game state
        return {"bird_y": self.bird_y, "pipes": self.pipes, "score": self.score}

    def move_pipes(self):
        if len(self.pipes) == 0 or self.pipes[-1][0] < 300:
            # Add a new pipe at a random height
            gap_position = random.randint(100, 400)
            self.pipes.append([500, gap_position])

        # Move each pipe left
        for pipe in self.pipes:
            pipe[0] -= 5  # Move pipe to the left

        # Remove pipes that have moved out of screen
        self.pipes = [pipe for pipe in self.pipes if pipe[0] > -50]

    def check_collision(self):
        # Simple collision logic
        for pipe in self.pipes:
            if pipe[0] < 50 < pipe[0] + 80:  # Bird x position within pipe range
                if self.bird_y < pipe[1] - 60 or self.bird_y > pipe[1] + 60:
                    return True
        if self.bird_y < 0 or self.bird_y > 500:  # Hit top or bottom
            return True
        return False
