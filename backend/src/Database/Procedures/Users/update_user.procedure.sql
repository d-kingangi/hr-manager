CREATE OR ALTER PROCEDURE update_user
AS
BEGIN
    UPDATE users SET
    first_name = @first_name,
    last_name = @last_name,
    phone = @phone,
    email = @email,
    role = @role,
    updated_at = @updated_at
    WHERE user_id = @user_id
END