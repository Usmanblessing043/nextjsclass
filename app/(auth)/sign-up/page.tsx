'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupFormData } from '@/lib/validation/authSchema';
import axios from 'axios';
import { useRouter } from "next/navigation";






const page = () => {
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<signupFormData>({ resolver: zodResolver(signupSchema) })
    const onSubmit = (data: signupFormData) => {
        console.log(data);
        
        // fetch("http://localhost:3000/api/register",{
        //     method:'POST',
        //     body:JSON.stringify(data)
        // }).then((res)=> res.json())
        // .then((data)=>{
        //     console.log(data);
            
        // }).catch((err)=>{
        //     console.log();
            
        // })
        axios.post("http://localhost:3000/api/register", data)
        .then((res) => {
          console.log(res);
          alert(res.data.message)
         
          router.push("/login");
           reset()
           
        })
        .catch((err) => { 
          console.log(err);
          
        })
        


    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="container mt-5" style={{ maxWidth: "400px" }}>

                <h3 className="mb-4 text-center">Signup</h3>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        {...register("name")}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name.message}
                        </div>
                    )}
                </div>


                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        {...register("email")}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <div className="invalid-feedback">
                            {errors.email.message}
                        </div>
                    )}
                </div>


                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter password"
                    />
                    {errors.password && (
                        <div className="invalid-feedback">
                            {errors.password.message}
                        </div>
                    )}
                </div>

               <button disabled={isSubmitting} className="btn btn-primary w-100">
  {isSubmitting ? "Signing up..." : "Signup"}
</button>


            </form>

        </div>
    )
}

export default page