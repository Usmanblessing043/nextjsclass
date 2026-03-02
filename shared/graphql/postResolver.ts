// import { usermodel } from "../database/model/usermodel";
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





export const postresolvers = {
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
       
        posts: async () => {
            return await PostModel.find().sort({ createdAt: -1 })

        },
        post: async (_: any, { id }: { id: string }) => {
            return await PostModel.findById(id);
        },
    },

    Mutation: {
        
        
        createPost: async (_: any, { title, content, excerpt, category, image, author }: any) => {
            try {
                console.log("CREATE POST HIT");
                console.log({ title, content, excerpt, category, image, author });

                if (!title || !content || !excerpt || !category || !image || !author) {
                    throw new Error("All fields are mandatory");
                }

                const uploader = await cloudinary.uploader.upload(image);
                console.log("UPLOAD RESULT:", uploader);

                const post = await PostModel.create({
                    title,
                    content,
                    image: uploader.secure_url,
                    excerpt,
                    category,
                    author,
                });

                console.log("POST CREATED:", post);

                return post;
            } catch (error) {
                console.error("CREATE POST ERROR:", error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        },
        deletePost: async (_: any, { id }: any) => {
            try {
                await PostModel.findByIdAndDelete(id);
                return "Deleted";
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error?.message);
                }
            }
        },
        updatePost: async (_: any, args: any) => {
            const { id, ...rest } = args;

            return await PostModel.findByIdAndUpdate(
                id,
                rest,
                { new: true }
            );
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