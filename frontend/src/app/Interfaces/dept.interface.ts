export interface department{
    dept_id: string;
    name: string,
    manager_id: string,
    description: string,
    is_deleted: boolean
}

export interface departmentInfoResponse{
    message: string,
}

export interface departmentInfoResponse{
    info:{
        dept_id: string;
        name: string,
        manager_id: string,
        description: string,
        is_deleted: boolean
    },
    error: string
}

export interface allDepartmentsResponse{
    departments: department[];
    error?: string;
}