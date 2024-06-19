export interface user {
    user_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    role: string;
    dept_id: string;
    password: string;
    created_at: Date;
    // updated_at: Date
  }
  
  export interface userInfoResponse {
    user: {
      user_id: string;
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      role: string;
      dept_id: string;
      password: string;
      created_at: Date;
      // updated_at: Date
    };
    error: string;
  }
  
  export interface allUsersResponse {
    users: user[];
    error: string;
  }
  