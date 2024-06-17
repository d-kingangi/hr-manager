CREATE OR ALTER PROCEDURE login_user(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    SELECT * from users WHERE email = @email
END