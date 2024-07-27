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