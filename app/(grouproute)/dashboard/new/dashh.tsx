"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { gql } from "graphql-tag";
import { useMutation, useQuery } from '@apollo/client/react'
import { toast } from "react-hot-toast";
import { ThreeDots } from 'react-loader-spinner'
import { jwtDecode } from 'jwt-decode';
import { BiCarousel, BiUser, BiEnvelope, BiLock, BiShow, BiHide, BiHome, BiLogOut, BiSearch, BiX } from "react-icons/bi";

type SinglePostResponse = {
    post: {
        id: string;
        title: string;
        content: string;
        excerpt: string;
        category: string;
        image: string;
        author: string;

        createdAt: string;
    };
};



const createPostt = gql`
mutation CreatePost(
  $title: String!
  $content: String!
  $excerpt: String!
  $category: String!
  $image: String!
  $author: String!
   
) {
  createPost(
    title: $title
    content: $content
    excerpt: $excerpt
    category: $category
    image: $image
    author: $author
     
  ) {
    id
    title
    content
    excerpt
    category
    image
    author
    createdAt
 
  }
}
`;
const GET_SINGLE_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      excerpt
      category
      image
      author
      createdAt

    }
  }
`;
const UPDATE_POST = gql`
mutation UpdatePost(
  $id: ID!
  $title: String!
  $content: String!
  $excerpt: String!
  $category: String!
  $image: String!
  $author: String!

) {
  updatePost(
    id: $id
    title: $title
    content: $content
    excerpt: $excerpt
    category: $category
    image: $image
    author: $author

  ) {
    id
  }
}
`;
type DecodedToken = {
    exp: number;
    id: string;
    email: string;
    role: string;
};


const dashh = ({ postId }: { postId?: string }) => {
    const [userName, setUserName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<string>("");
    const [author, setAuthor] = useState("");
    const [preview, setpreview] = useState<string>("")
    const [fileName, setFileName] = useState("");
    const router = useRouter()
   
    const isEdit = Boolean(postId);


    const [updatePost, { loading: updating }] = useMutation(UPDATE_POST);
    const { data: singlePostData } = useQuery<SinglePostResponse>(GET_SINGLE_POST, {
        variables: { id: postId },
        skip: !postId,
    });
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         router.push("/login");
    //         return;
    //     }

    //     try {
    //         const decoded: DecodedToken = jwtDecode(token);
    //         const currentTime = Date.now() / 1000;
    //         if (decoded.exp < currentTime) {
    //             localStorage.removeItem("token");
    //             router.push("/login");
    //         }
    //     } catch (err) {
    //         localStorage.removeItem("token");
    //         router.push("/login");
    //     }
    // }, [router]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const parsed = JSON.parse(user);
            setAuthor(parsed.name);
        }
    }, []);


    const showErrorOnce = () => {
        toast.error("All fields are required", { id: "empty-post" });
    };
    const [createPost, { loading: creating }] = useMutation(createPostt);

    const handleCreate = async (e: any) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (!title.trim() || !content.trim() || !image.trim() || !excerpt.trim() || !author.trim() || !category.trim()) {
            showErrorOnce();
            return;
        }

        try {
            if (isEdit && postId) {

                await updatePost({
                    variables: {
                        id: postId,
                        title,
                        content,
                        excerpt,
                        category,
                        image,
                        author

                    },
                    refetchQueries: ["GetPosts"]
                });

                toast.success("Post updated");
            } else {

                await createPost({
                    variables: {
                        title,
                        content,
                        excerpt,
                        category,
                        image,
                        author

                    },
                    refetchQueries: ["GetPosts"]
                });

                toast.success("Post created");
            }

            router.push("/dashboard");
            router.refresh()
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const isSubmitting = creating || updating;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            toast.error('file cannnot be empty')
            return
        }
        setFileName(file.name);
        const reader = new FileReader()
        reader.onloadend = () => {
            setImage(reader.result as string)
            setpreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }
    const clearr = (e: any) => {
        setTitle("");
        setContent("");
        setExcerpt("");
        setCategory("");
        setImage("");
        setAuthor("")
        setpreview("")
    }
    const handlehome = () => {
        router.push('/dashboard')
        router.refresh()
    }
    useEffect(() => {
        if (singlePostData?.post) {
            const p = singlePostData.post;

            setTitle(p.title || "");
            setContent(p.content || "");
            setExcerpt(p.excerpt || "");
            setCategory(p.category || "");
            setImage(p.image || "");
            setAuthor(p.author || "");
            setpreview(p.image || "");
        }
    }, [singlePostData]);

    return (
        <div className="w-full px-6 py-6 space-y-6 bg-white">
            <div className='flex bg-white/85 items-center justify-between py-4 px-35 sticky top-0 backdrop-blur-md z-50 border-0 border-b-1 border-gray-300' >
                <div className='flex items-center gap-2'>
                    <div><button className='bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 text-white  py-2 rounded-lg px-[7px] text-[20px] '> <BiCarousel></BiCarousel></button></div>
                    <div>
                        <h1 className='text-[18px] text-[#000] font-medium'>{isEdit ? "Edit Post" : "New Post"}</h1>
                        <h6 className='text-[11px] text-gray-400 font-medium'>Create new blog</h6>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>

                    <button onClick={handlehome} className='bg-transparent text-black  py-2 rounded-lg px-[20px] hover:text-red-600 hover:bg-pink-100 '><BiX className='text-[25px]'></BiX></button>

                </div>
            </div>


            <div className=' py-4 px-70'>
                <form
                    onSubmit={handleCreate}
                    className="bg-white p-4 rounded-lg shadow space-y-3"
                >

                    <p>Title*</p>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter an engaging title for your post."
                        className="w-full border p-2 rounded border-gray-300 focus-within:outline-blue-500"
                    />
                    <p>Excerpt*</p>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Write a brief summary that will appear in previews"
                        className="w-full h-22 border p-2 rounded resize-none  border-gray-300  focus-within:outline-blue-500"
                    />
                    <p>Content*</p>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog post content here"
                        className="w-full h-90 border p-2 rounded resize-none  border-gray-300  focus-within:outline-blue-500"
                    />

                    <div className='flex justify-between'>
                        <div>
                            <p>Author*</p>
                            <input
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Your name"
                                className="w-[400px] border p-2 rounded  border-gray-300  focus-within:outline-blue-500"
                                disabled={true}
                            />
                        </div>

                        <div>
                            <p>Category*</p>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-[400px] border p-2 rounded  border-gray-300  focus-within:outline-blue-500"
                            >
                                <option value="">Select category</option>
                                <option value="Technology">Technology</option>
                                <option value="Design">Design</option>
                                <option value="Food">Food</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Health">Health</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>
                    </div>


                    <label className="block text-sm font-medium mb-2">
                        Upload Image
                    </label>


                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition">
                        <div className="text-center px-4">
                            <p className="font-medium">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, JPEG (max 5MB)
                            </p>
                            {fileName && (
                                <p className="text-sm mt-2 text-green-600">
                                    {fileName}
                                </p>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    {preview && (
                        <img src={preview} alt='preview' className='w-32 h-32 object-cover rounded'></img>
                    )}

                    <button
                        disabled={isSubmitting}
                        className={`px-4 py-2 rounded text-white transition
                        ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 hover:shadow-lg"
                            }`}>
                        {isSubmitting
                            ? "Saving..."
                            : isEdit
                                ? "Update Post"
                                : "Publish Post"}
                    </button>

                    <button type='button' className=' text-black border m-3 border-gray-200 px-4 py-2 rounded' onClick={clearr}>Cancel</button>


                </form>
            </div>



        </div>
    );
}

export default dashh