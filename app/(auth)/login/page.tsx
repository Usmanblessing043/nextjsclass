'use client'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { toast } from "react-hot-toast";
import Link from "next/link";
import { BiCarousel, BiUser, BiEnvelope, BiLock, BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";


import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, loginFormData } from '@/lib/validation/authSchema'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useMutation } from '@apollo/client/react'
import { gql } from 'graphql-tag'

type LoginMutationResult = {
  login: {
    token: string;
    user: {
      name: string;
      email: string;
      role: string;
      age: number;
    };
  };
};

const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      name
      email
      role
      age
    } 
  }
}
`


const page = () => {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter();
  const { register, reset, handleSubmit, formState: { errors }, } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) })
  const [loginUser, { loading, error }] = useMutation<LoginMutationResult>(LOGIN);
  const onSubmit = async (data: loginFormData) => {
    console.log(data);
    // axios.post("http://localhost:3000/api/login", data)
    //         .then((res) => {
    //           console.log(res);
    //           alert(res.data.message)

    //            reset()

    //         })
    //         .catch((err) => { 
    //           console.log(err);
    //           alert(err.response?.data?.message )

    //         })
    try {
      const res = await loginUser({ variables: data, });
      console.log(res.data);

      if (res.data?.login?.token) {
        localStorage.setItem("token", res.data.login.token);
        localStorage.setItem("user", JSON.stringify(res.data.login.user));
        toast.success("Login Successful");


        router.push("/Home");


      } else {
        toast.error("Login failed: Invalid credentials");
        reset();
      }



      // router.push("/dashboard");
    } catch (err: any) {
      if (err.graphQLErrors?.length > 0) {
        toast.error(err.graphQLErrors[0].message)

      } else {
        toast.error(err.message)
        console.log(err.message);

      }
      reset()

    }

  }
  return (
    <div className="flex items-center flex-col gap-4 justify-center min-h-screen bg-gradient-to-r from-white via-pink-100 to-pink-100 p-4">
      <div className=" flex gap-1">
        <button className='bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 text-white  py-2 rounded-lg px-[7px] text-[20px] '> <BiCarousel></BiCarousel></button>
        <h1 className="font-bold text-2xl">The Modern Blog</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl"
      >
        <h3 className="text-2xl text-black font-semibold mb-2 text-center">Welcome Back</h3>
        <p className="text-1xl text-gray-400  mb-3 text-center">Sign in to manage your blog</p>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <div className="relative">
            <BiEnvelope className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${errors.email ? "border-blue-500" : "border-gray-300"}`}
            />
            <p className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
              {errors.email ? errors.email.message : " "}
            </p>
          </div>
        </div>


        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <div className="relative">
            <BiLock className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${errors.password ? "border-blue-500" : "border-gray-300"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
            </button>
            <p className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
              {errors.password ? errors.password.message : " "}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <h1 className="text-[13px]">Don't have an account?</h1>
          <Link className="text-[13px] text-purple-900" href='/sign-up'>Create Account</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-purple-700 hover:shadow-lg text-white py-3 rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>

  )
}

export default page