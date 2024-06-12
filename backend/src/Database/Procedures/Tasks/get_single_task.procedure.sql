CREATE PROCEDURE get_single_task
    @task_id VARCHAR(255)
AS
BEGIN
    SELECT 
        t.task_id,
        t.title,
        t.description,
        t.due_date,
        t.status,
        t.estimated_effort,
        t.completed_at,
        t.labels,
        -- Information about the user who created the task
        created_by_user.user_id AS created_by_user_id,
        created_by_user.first_name AS created_by_first_name,
        created_by_user.last_name AS created_by_last_name,
        created_by_user.role AS created_by_role,
        created_by_user.email AS created_by_email,
        created_by_user.dept_id AS created_by_dept_id,
        created_by_dept.name AS created_by_dept_name,
        created_by_manager.first_name AS created_by_manager_first_name,
        created_by_manager.last_name AS created_by_manager_last_name,
        -- Information about the user to whom the task is assigned
        assigned_to_user.user_id AS assigned_to_user_id,
        assigned_to_user.first_name AS assigned_to_first_name,
        assigned_to_user.last_name AS assigned_to_last_name,
        assigned_to_user.role AS assigned_to_role,
        assigned_to_user.email AS assigned_to_email,
        assigned_to_user.dept_id AS assigned_to_dept_id,
        assigned_to_dept.name AS assigned_to_dept_name,
        assigned_to_manager.first_name AS assigned_to_manager_first_name,
        assigned_to_manager.last_name AS assigned_to_manager_last_name
    FROM 
        tasks t
    LEFT JOIN 
        users created_by_user ON t.created_by = created_by_user.user_id
    LEFT JOIN 
        departments created_by_dept ON created_by_user.dept_id = created_by_dept.dept_id
    LEFT JOIN 
        users created_by_manager ON created_by_dept.manager_id = created_by_manager.user_id
    LEFT JOIN 
        users assigned_to_user ON t.assigned_to = assigned_to_user.user_id
    LEFT JOIN 
        departments assigned_to_dept ON assigned_to_user.dept_id = assigned_to_dept.dept_id
    LEFT JOIN 
        users assigned_to_manager ON assigned_to_dept.manager_id = assigned_to_manager.user_id
    WHERE 
        t.task_id = @task_id
    AND 
        created_by_user.is_deleted = 0
    AND 
        assigned_to_user.is_deleted = 0;
END;
