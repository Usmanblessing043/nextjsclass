'use client'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { toast } from "react-hot-toast";
import {  BiCarousel, BiUser, BiEnvelope, BiLock, BiShow, BiHide } from "react-icons/bi";
import Link from "next/link";

import { useState } from "react";

import React from 'react'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupFormData } from '@/lib/validation/authSchema';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { gql } from 'graphql-tag'
import { useMutation } from '@apollo/client/react'
import { log } from 'console'

const CREATEUSER = gql`
mutation Createuser($name: String!, $email: String!, $age: Int!, $role:String!, $password:String!) {
  createuser(name: $name, email: $email, age: $age, role: $role, password:$password ) {
 id,
  name,
  email,
  role,
  createdAt,
  age
  }
}`






const page = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<signupFormData>({ resolver: zodResolver(signupSchema) })
    const [createUser, { loading, error }] = useMutation(CREATEUSER);
    const onSubmit = async (data: signupFormData) => {
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

        // axios.post("http://localhost:3000/api/register", data)
        // .then((res) => {
        //   console.log(res);
        //   alert(res.data.message)

        //   router.push("/login");
        //    reset()

        // })
        // .catch((err) => { 
        //   console.log(err);

        // })
        try {
            const res = await createUser({
                variables: {
                    name: data.name,
                    email: data.email,
                    age: Number(data.age), 
                    role: "user", 
                    password: data.password,
                },
            });

            console.log(res);

            toast.success("Signup successful ")
            reset();
            router.push("/login");

        } catch (err: any) {
            if (err.graphQLErrors?.length > 0) {
                toast.error(err.graphQLErrors[0].message)

            } else {
                toast.error(err.message)
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
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl "
            >
                <h3 className="text-2xl text-black font-semibold mb-2 text-center">Create Account</h3>
                <p className="text-1xl text-gray-400  mb-3 text-center">Join our community of writers</p>

                
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Name</label>
                   <div className="relative">
                    <BiUser className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        {...register("name")}
                        placeholder="Enter your name"
                        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${errors.name ? "border-blue-500" : "border-gray-300"}`}
                    />
                   <p className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
                        {errors.name ? errors.name.message : " "}
                    </p>
                </div>
                </div>

                
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

                
                <div className="mb-6">
                    <label className="block mb-1 font-medium text-gray-700">Age</label>
                    <input
                        {...register("age")}
                        type="number"
                        min={1}
                        max={120}
                        placeholder="Enter your age"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2  text-black focus:ring-blue-500 ${errors.age ? "border-blue-500" : "border-gray-300"
                            }`}
                    />
                    {errors.age && (
                        <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                    )}
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <h1 className="text-[13px]">Already have an account?</h1>
                    <Link className="text-[13px] text-purple-900" href='/login'>Login</Link>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-purple-700 hover:shadow-lg text-white py-3 rounded-md font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    )
}

export default page