CREATE OR ALTER PROCEDURE welcom_user
AS
BEGIN
    SELECT * FROM 
    users
    WHERE
    is_welcomed = 0 and is_deleted = 0
END