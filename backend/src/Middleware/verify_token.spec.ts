import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

let mockRequest = () =>{
    return {
        headers:{
            token: "valid_token_for_testing_dskjgjfls_fdsjgfdj_fjhggkfsakjh"
        }
    } 
}


let mockResponse = ()=>{
    return{
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
    
}

let mockNext = jest.fn()

describe('Testing the middleware', () => {
    let token: string;

    beforeAll(()=> {
        const userData: loginDetails = {
            first_name: "John",
            last_name: "Doe",
            phone: "123-456-7890",
            email: "john.doe@example.com",
            role: "employee",
            dept_id: "1",
            password: "secure_password",
            created_at: "2024-06-14T09:32:00.000Z",
            updated_at: "2024-06-14T09:32:00.000Z"
        };

        token = jwt.sign( userData, process.env.SECRET as string)
    })

    it('should return 401 if no token is provided', async () => {
        const response = await request(app)
          .post('/api/verifyToken')
          .send({});
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('You do not have access');
    });

    it('should return 403 if token is invalid', async () => {
        const response = await request(app)
          .post('/api/verifyToken')
          .set('token', 'invalidtoken')
          .send({});
        expect(response.status).toBe(403);
        expect(response.body.error).toBe('Forbidden: Invalid token');
    });

    it('should return 200 if token is valid', async () => {
        const response = await request(app)
          .post('/api/verifyToken')
          .set('token', token)
          .send({});
        expect(response.status).toBe(200);
      });
})