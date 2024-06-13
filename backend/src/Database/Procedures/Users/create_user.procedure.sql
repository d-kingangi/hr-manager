CREATE OR ALTER PROCEDURE create_user
    @user_id VARCHAR(255),
    @first_name VARCHAR(255),
    @last_name VARCHAR(255),
    @phone VARCHAR(255),
    @email VARCHAR(255),
    @role VARCHAR(255),
    @dept_id VARCHAR(255),
    @password VARCHAR(255),
    @created_at DATETIME,
    @updated_at DATETIME
AS
BEGIN
    INSERT INTO users(user_id, first_name, last_name, phone, email, role, dept_id, password, created_at, updated_at)
    VALUES (@user_id , @first_name, @last_name, @phone, @email, @role, @dept_id, @password, @created_at, @updated_at)
END