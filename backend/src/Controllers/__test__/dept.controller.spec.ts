import mssql from 'mssql'
import { create_dept, get_all_depts, get_single_dept, get_dept_employees, update_dept, delete_dept } from '../dept.controller';

describe('Department created successfully', ()=>{
    let res: any
    let req: any

    beforeEach(()=>{
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }  
    })

    it('Successfully creates department', async () => {
        const req = {
            body:{
                name: "Engineering",
                manager_id: "e611b083-468f-4d1f-b7b7-fc174da76b99",
                description: "Engineering department"
            }
        }
    })

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

    await create_dept(req as any, res)

    expect(res.json).toHaveBeenCalledWith({message: "Department created successfully"})
})


describe('Gets all departments', ()=>{
    let req: any
    let res: any

    beforeEach(()=>{
        req={
            body:{}
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis
        }
    })

    it('Successfully gets departments', async () => {
        const mockResult = [
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

        await get_all_depts(req as any, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ users: mockedResult });
    })
})