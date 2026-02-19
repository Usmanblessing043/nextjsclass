import { signupSchema, signupFormData } from "@/lib/validation/authSchema";
import {z} from "zod"

import { alluser } from "@/lib/data/user";

// const alluser:signupFormData[] = []
export async function POST (request:Request){
    try {
        const body = await request.json()
        console.log(body);
        const result = signupSchema.safeParse(body)
        console.log(result, 'validation result');
        if (result.success == false) {
            const pretty =  z.prettifyError(result.error)
            console.log(JSON.stringify(pretty));
            
            return Response.json(pretty)
            
        }
        alluser.push(body)
        console.log(alluser);
         return Response.json({message:'user registered successfully'})

        
    } catch (error:any) {
        console.log(error, 'errormesssage');
        return Response.json({message:error?.message})
    }
}