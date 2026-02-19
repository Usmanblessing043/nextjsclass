'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema,loginFormData } from '@/lib/validation/authSchema'
import axios from 'axios';
import { useRouter } from "next/navigation";





const page = () => {
   const router = useRouter();
  const { register, reset, handleSubmit, formState: { errors }, } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) })
  const onSubmit = (data: loginFormData) => {
    console.log(data);
    axios.post("http://localhost:3000/api/login", data)
            .then((res) => {
              console.log(res);
              alert(res.data.message)
             
               reset()
               
            })
            .catch((err) => { 
              console.log(err);
              alert(err.response?.data?.message )
              
            })


  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-5" style={{ maxWidth: "400px" }}>

        <h3 className="mb-4 text-center">Login</h3>


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

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

      </form>

    </div>
  )
}

export default page