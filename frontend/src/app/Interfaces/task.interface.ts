export interface task {
    task_id: string;
    title: string;
    description: string;
    due_date: string;
    status: string;
    estimated_effort: number;
    completed_at: string | null;
    labels: string;
    created_by_user_id: string;
    created_by_first_name: string;
    created_by_last_name: string;
    created_by_role: string;
    created_by_email: string;
    created_by_dept_id: string;
    created_by_dept_name: string | null;
    created_by_manager_first_name: string | null;
    created_by_manager_last_name: string | null;
    assigned_to_user_id: string;
    assigned_to_first_name: string;
    assigned_to_last_name: string;
    assigned_to_role: string;
    assigned_to_email: string;
    assigned_to_dept_id: string;
    assigned_to_dept_name: string | null;
    assigned_to_manager_first_name: string | null;
    assigned_to_manager_last_name: string | null;
}

export interface taskInfoResponse{
    message: string
}

export interface taskInfoResponse{
    info:{
        task_id: string;
        title: string;
        description: string;
        due_date: string;
        status: string;
        estimated_effort: number;
        completed_at: string | null;
        labels: string;
        created_by_user_id: string;
        created_by_first_name: string;
        created_by_last_name: string;
        created_by_role: string;
        created_by_email: string;
        created_by_dept_id: string;
        created_by_dept_name: string | null;
        created_by_manager_first_name: string | null;
        created_by_manager_last_name: string | null;
        assigned_to_user_id: string;
        assigned_to_first_name: string;
        assigned_to_last_name: string;
        assigned_to_role: string;
        assigned_to_email: string;
        assigned_to_dept_id: string;
        assigned_to_dept_name: string | null;
        assigned_to_manager_first_name: string | null;
        assigned_to_manager_last_name: string | null;
    },
    error: string
}

export interface allTasksResponse{
    tasks:[
        {
            task_id: string;
            title: string;
            description: string;
            due_date: string;
            status: string;
            estimated_effort: number;
            completed_at: string | null;
            labels: string;
            created_by_user_id: string;
            created_by_first_name: string;
            created_by_last_name: string;
            created_by_role: string;
            created_by_email: string;
            created_by_dept_id: string;
            created_by_dept_name: string | null;
            created_by_manager_first_name: string | null;
            created_by_manager_last_name: string | null;
            assigned_to_user_id: string;
            assigned_to_first_name: string;
            assigned_to_last_name: string;
            assigned_to_role: string;
            assigned_to_email: string;
            assigned_to_dept_id: string;
            assigned_to_dept_name: string | null;
            assigned_to_manager_first_name: string | null;
            assigned_to_manager_last_name: string | null;
        }
    ],
    error: string
}


