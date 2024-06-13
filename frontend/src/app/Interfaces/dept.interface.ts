export interface department{
    dept_id: string;
    name: string,
    manager_id: string,
    description: string
}

export interface departmentInfoResponse{
    info:{
        dept_id: string,
        name: string,
    },
    error: string
}

export interface allDepartmentsResponse{
    industries:[
        {
            dept_id: string,
            name: string,
        }
    ],
    error: string
}