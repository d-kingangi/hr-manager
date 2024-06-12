CREATE OR ALTER PROCEDURE get_all_users
AS
BEGIN
    SELECT * FROM users WHERE is_deleted = 0
END