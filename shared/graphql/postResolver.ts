// import { usermodel } from "../database/model/usermodel";
import { PostModel } from "../database/model/postmodel";
import { usermodel } from "../database/model/usermodel";
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



type contexttype = {
    user?: {
        email: string
        id: string
        iat: number
    }
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

        posts: async (_: any, { page, limit }: { page: number, limit: number }) => {

            console.log(page);
            console.log(limit);
            const skip = (page - 1) * limit
            const total = await PostModel.countDocuments()
            const totalpages = Math.ceil(total / limit)

            const posts = await PostModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            return {
                posts,
                total,
                totalpages
            };
        },
        post: async (_: any, { id }: { id: string }) => {
            return await PostModel.findById(id);
        },
    },

    Mutation: {


        createPost: async (_: any, { title, content, excerpt, category, image, author }: any, context: contexttype) => {
            try {

                const { user } = context
                console.log(user);
                if (!user) {
                    throw new Error("invalid user")
                }
                console.log("CREATE POST");
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
                    authorId: user.id.toString()

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
        deletePost: async (_: any, { id }: any, context: contexttype) => {
            try {
                const { user } = context;

                if (!user) {
                    throw new Error("Invalid user");
                }

                const oneuser = await usermodel.findById(user.id);

                if (!oneuser) {
                    throw new Error("User not found");
                }

                const deleteblog = await PostModel.findOneAndDelete({
                    _id: id,
                    author: oneuser.name
                });

                if (!deleteblog) {
                    throw new Error("You cannot delete another user's post");
                }

                return "Post deleted successfully";

            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        },
        updatePost: async (_: any, args: any, context: contexttype) => {
            try {
                const { user } = context;

                if (!user) {
                    throw new Error("Invalid User");
                }

                const oneuser = await usermodel.findById(user.id);

                if (!oneuser) {
                    throw new Error("User not found");
                }
                const updateData = {
                    title: args.title,
                    content: args.content,
                    excerpt: args.excerpt,
                    category: args.category,
                    image: args.image,
                };

                const updatedPost = await PostModel.findOneAndUpdate(
                    {
                        _id: args.id,
                        author: oneuser.name
                    },
                    updateData,
                    { new: true }
                );

                if (!updatedPost) {
                    throw new Error("You cannot edit another user's post");
                }

                return updatedPost;

            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
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