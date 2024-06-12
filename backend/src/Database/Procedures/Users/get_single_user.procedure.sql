CREATE OR ALTER PROCEDURE get_single_user
    @user_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM users WHERE user_id = @user_id AND is_deleted = 0
END