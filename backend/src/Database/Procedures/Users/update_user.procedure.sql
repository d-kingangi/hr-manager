CREATE OR ALTER PROCEDURE update_user
(
  @user_id VARCHAR(255), 
  @first_name VARCHAR(255),  
  @last_name VARCHAR(255),
  @phone VARCHAR(255),
  @email VARCHAR(255),
  @role VARCHAR(255),
  @dept_id VARCHAR(255),
  @updated_at DATETIME  
)
AS
BEGIN
  UPDATE users SET
    first_name = @first_name,
    last_name = @last_name,
    phone = @phone,
    email = @email,
    role = @role,
    dept_id = @dept_id,
    updated_at = @updated_at
  WHERE user_id = @user_id
END
