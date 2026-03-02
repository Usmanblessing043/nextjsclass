import { usermodel } from "../database/model/usermodel";
import { PostModel } from "../database/model/postmodel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import cloudinary from "../lib/cloudinary";
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
export const usertypeDefs = `
type user{
id: ID!
name:String
email:String
age: Int
role:String
createdAt: String

}
type userinput{
name:String
email:String
age: Int
role:String
password:String}

type LoginResponse {
  token: String!
  user: user!
}

type Post {
  id: ID!
  title: String
  content: String
  excerpt:String
   category:String
   image:String 
   author:String
  createdAt: String
}



type Query{
users:[user]
oneuser(id:ID):user

}
type Mutation{
            createuser(name:String!,email:String!,age: Int!,role:String!, password:String!): user
             login( email:String! password:String!):  LoginResponse
             }
`



