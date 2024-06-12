CREATE OR ALTER PROCEDURE login_user
AS
BEGIN
    SELECT * from users WHERE email = @email
END