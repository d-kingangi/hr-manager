CREATE OR ALTER PROCEDURE create_dept
    @dept_id VARCHAR(255),
    @name VARCHAR(255),
    @manager_id VARCHAR(255),
    @description TEXT,
AS
BEGIN
    INSERT INTO departments(dept_id, name, manager_id, description)
    VALUES (@dept_id, @name, @manager_id, @description, @created_at, @updated_at)
END