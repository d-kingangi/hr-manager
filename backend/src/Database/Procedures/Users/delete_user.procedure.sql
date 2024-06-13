CREATE OR ALTER PROCEDURE delete_user
(
  @user_id VARCHAR(255)
)
AS
BEGIN
  UPDATE users SET is_deleted = 1 WHERE user_id = @user_id
END