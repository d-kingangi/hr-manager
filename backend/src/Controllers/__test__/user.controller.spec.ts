import mssql from 'mssql'
import { register_user, get_all_users, get_single_user, update_user, delete_user } from '../user.controller'


describe('Account created successfully', ()=> {
    let res: any;
    let req: any;

    beforeEach(()=>{
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully create account', async () => {
        const req = {
            body:{
                first_name: 'Lee',
                last_name: 'Lee',
                phone: 'Lee',
                email: 'lee@mail.com',
                role: 'Lee',
                dept_id:'Lee',
                password: 'Lee',
                created_at: '2024-06-14T09:32:00.000Z',
                updated_at: '2024-06-14T09:32:00.000Z'
            }
        }

        const mockedInput = jest.fn().mockReturnThis() 

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
        request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

    await register_user(req as any, res)

    expect(res.json).toHaveBeenCalledWith({message: "Account created successfully"})
    })
})


describe('Gets all users', ()=>{
    let res: any
    let req: any

    beforeEach(()=>{
        req={
            body:{}
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully get users', async () => {
        const mockedResult = [
            // json mock results
        ]

        const mockedInput = jest.fn().mockReturnThis() 

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult })

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await get_all_users(req as any, res)

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({ users: mockedResult });

    })
})


describe('Gets single user', ()=>{

    let req: any
    let res: any


    beforeEach(()=>{
        req = {
            params: {
                user_id: '353545-43495835-458347575', 
            },
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    })

    it('Successful fetch for a single member',async () => {
        const mockedResult = [
           //mock json result {}
        ]
    
        const mockedInput = jest.fn().mockReturnThis() 
    
        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult [0] })
    
        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }
    
        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }
    
        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)
    
        await get_single_user(req as any, res)
    
        // expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "An error occurred while fetching member." });
    })
})


describe('User updated successfully', ()=>{
    let res: any
    let req: any

    beforeEach(()=>{
        req={
            params: {
                user_id: '353545-43495835-458347575', 
            }
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully updates user',async () => {
        const req={ 
          body:{
            //
          }
        }
    
        const mockedInput = jest.fn().mockReturnThis() 
    
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})
    
        const mockedRequest ={
           input: mockedInput,
           execute: mockedExecute
        }
    
        const mockedPool ={
          request: jest.fn().mockReturnValue(mockedRequest)
        }
    
        await update_user(req as any, res);
    
        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)
    
        expect(res.json).toHaveBeenCalledWith({message: "User updated successfully"})
    
    })
})


describe('Account deleted successfully', ()=>{

    let res: any
    let req: any

    beforeEach(()=>{
        req={
            params:{
                user_id: '353545-43495835-458347575'
            }
        }
        res= {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis
        }
    })

    it('Successfully deletes user',async () => {
        const req={ body:{}}
        
        const mockedInput = jest.fn().mockReturnThis()
  
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})
  
        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }
  
        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }
  
        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)
  
        await delete_user(req as any, res)
  
        // expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: "Account deleted successfully"})
    })
})