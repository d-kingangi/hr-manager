export interface task{
    title: string,
    description: string,
    due_date: Date,
    status: string,
    assigned_to: string,
    created_by: string,
    estimated_effort: number,
    completed_at: string,
    labels: string,
}

export interface taskInfoResponse{
    message: string
}

export interface taskInfoResponse{
    info:{
        title: string,
        description: string,
        due_date: Date,
        status: string,
        assigned_to: string,
        created_by: string,
        estimated_effort: number,
        completed_at: string,
        labels: string
    },
    error: string
}

export interface allTasksResponse{
    tasks:[
        {
            title: string,
            description: string,
            due_date: Date,
            status: string,
            assigned_to: string,
            created_by: string,
            estimated_effort: number,
            completed_at: string,
            labels: string 
        }
    ],
    error: string
}