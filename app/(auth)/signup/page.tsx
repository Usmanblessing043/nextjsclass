'use client'
import React, { useState } from 'react'


const signuppage = () => {
    type userdetail = {
        username:string,
        email:string,
        password: string,
        profilepicture?: string
    }
    const [username, setusername] = useState<string>()
    const [email, setemail] = useState <string>()
    const [password, setpassword] = useState <string>()
    const [alluser, setalluser] = useState <Array<userdetail>>([])
    const [count, setcount] = useState <Array<number>>([])
    const update = () =>{
        setusername('4')
        setemail('false')
        const user =  {
            username:'shola',
            email: 'usmanblessing043@gmail.com',
            password:'react'
        }
        setalluser([...alluser, user])
    }
    const parameter = (el: number) :boolean =>{
            if (el == 5) {
                return true
                
            }
            return false
    }
    console.log(parameter(5));
    const handleinputchange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        console.log(e.target.value);
        
        
    }
  return (
    <div>
        {username}
      
        <button className='bg-amber-400' onClick={update}>update</button>
        <input className='bg-amber-50' onChange={handleinputchange} type="text" />
        <textarea className='bg-green-400' onChange={handleinputchange} ></textarea>
        {/* <button onClick={()=>parameter(5)}>parameter</button> */}
        {/* zod */}

        <div className="mt-4 text-amber-50">
    {alluser.map((user, index) => (
      <div key={index} className="border p-2 mb-2">
        <p className='text-white'>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>
      </div>
    ))}
  </div>
    </div>
  )
}

export default signuppage