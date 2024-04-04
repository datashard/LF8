export default {
  insertScore: (username: string, score: number) => `
DO $$
DECLARE
    temp_id INTEGER;
BEGIN
    -- Check if the username exists in the player table
    SELECT id INTO temp_id FROM players WHERE username = '${username}';

    -- If the username doesn't exist, create it and retrieve the ID
    IF NOT FOUND THEN
        INSERT INTO players (username) VALUES ('${username}') RETURNING id INTO temp_id;
    END IF;

    -- Insert into the score table using the retrieved or newly created ID
    INSERT INTO score (player, score) VALUES (temp_id, ${score});
END $$;`,
};
