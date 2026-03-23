import { usermodel } from "../database/model/usermodel";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import cloudinary from "../lib/cloudinary";
import { NextResponse } from "next/server";
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

// export const users = [
//     {
//         id: "1",
//         name: "John Doe",
//         email: "john.doe@example.com",
//         age: 28,
//         role: "admin",
//         createdAt: "2025-01-15T10:30:00Z",

//     },
//     {
//         id: "2",
//         name: "Jane Smith",
//         email: "jane.smith@example.com",
//         age: 34,
//         role: "user",
//         createdAt: "2025-02-20T14:45:00Z",
//     },
//     {
//         id: "3",
//         name: "Bob Johnson",
//         email: "bob.johnson@example.com",
//         age: 45,
//         role: "moderator",
//         createdAt: "2025-03-10T09:15:00Z",
//     },
//     {
//         id: "4",
//         name: "Alice Williams",
//         email: "alice.williams@example.com",
//         age: 29,
//         role: "user",
//         createdAt: "2025-04-05T16:00:00Z",
//     },
//     {
//         id: "5",
//         name: "Charlie Brown",
//         email: "charlie.brown@example.com",
//         age: 31,
//         role: "user",
//         createdAt: "2025-05-18T11:20:00Z",
//     },
// ];
type user = {
    name: string,
    email: string,
    age: number,
    role: string,
    password: string
}





export const userresolvers = {
    // Query: {
    //     users: () => {


    //         return users
    //     },
    //     oneuser: (_: any, { id }: { id: string }) => {
    //         const oneuser = users.find((user) => user.id == id)
    //         return oneuser
    //     }
    // },
    // Mutation: {
    //     createuser: (_: any, userdetail: user) => {
    //         console.log(userdetail);
    //         const newuser = {
    //             id: String(users?.length + 1),
    //             ...userdetail,
    //             // createdAt: String(Date.now())
    //             createdAt: new Date().toISOString()

    //         }
    //         console.log(newuser);
    //         users.push(newuser)
    //         return users
    //     }
    // }


    Query: {
        users: async () => {
            return await usermodel.find();
        },

        oneuser: async (_: any, { id }: { id: string }) => {
            return await usermodel.findById(id);
        },

    },

    Mutation: {
        createuser: async (_: any, userdetail: user) => {
            try {
                console.log(userdetail);
                const { name, email, age, role, password } = userdetail;
                if (!email || !password || !name || !role || !age) {
                    throw new Error("All fields are required");
                }
                const existingUser = await usermodel.findOne({ email });
                if (existingUser) {
                    throw new Error("Email already registered");
                }
                const hashedpassword = await bcrypt.hash(password, 10)
                const newuser = await usermodel.create({
                    name,
                    email,
                    age,
                    role,
                    password: hashedpassword,
                })
                if (newuser) {
                    return newuser

                }

            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error?.message);
                }
            }

        },
        login: async (_: any, { email, password }: any) => {
            try {
                const user = await usermodel.findOne({ email })
                if (!user) {
                    // throw new Error('User not found')
                    throw new GraphQLError('user not found')

                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error('Invalid email or password');
                }
                // const token = jwt.sign(
                //     { id: user._id, email: user.email, role: user.role },
                //     JWT_SECRET,
                //     { expiresIn: "1h" }
                // );
                const token = jwt.sign(
                    { id: user._id, email: user.email, role: user.role },
                    JWT_SECRET,
                    { expiresIn: "1h" }
                );
                // if (isMatch) {
                //     const response =  NextResponse.json({status:"success", user})
                //     response.cookies.set('auth_token', token,{
                //         httpOnly:true,
                //         secure:process.env.NODE_ENV === "production",
                //         sameSite:"strict",
                //         maxAge: 60 * 60 * 24,
                //         path:"/"
                //     })

                // }
                return {
                    user,
                    token,
                };

            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error?.message);
                }
            }

        },



    },

    Post: {
        id: (parent: any) => parent._id.toString(),
        createdAt: (parent: any) =>
            parent.createdAt ? parent.createdAt.toISOString() : null,
    },

    user: {
        id: (parent: any) => parent._id.toString(),
        createdAt: (parent: any) =>
            parent.createdAt ? parent.createdAt.toISOString() : null,
    },


}