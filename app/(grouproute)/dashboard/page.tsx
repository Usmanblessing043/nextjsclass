"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { gql } from "graphql-tag";
import { useMutation, useQuery } from '@apollo/client/react'
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { ThreeDots } from 'react-loader-spinner'
import { jwtDecode } from 'jwt-decode';
import { BiCarousel, BiUser, BiEnvelope, BiLock, BiShow, BiHide, BiHome, BiLogOut, BiSearch } from "react-icons/bi";
export const dynamic = "force-dynamic";

type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    excerpt: string
    category: string
    image: string
    author: string

};

type GetPostsResponse = {
    posts: {
        posts: Post[];
        total: number;
        totalpages: number;
    };
};
const getPost = gql`
query GetPosts($page: Int, $limit: Int) {
  posts(page: $page, limit: $limit) {
    posts {
      id
      title
      content
      excerpt
      category
      image
      author
      createdAt
      authorId
    }
    total
    totalpages
  }
}`



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
const deletePostt = gql`
 mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }`

type DecodedToken = {
    exp: number;
    id: string;
    email: string;
    role: string;
};

const dashboard = () => {
    const [userName, setUserName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<string>("");
    const [author, setAuthor] = useState("");
    const [preview, setpreview] = useState<string>("")
    const [search, setSearch] = useState("");
    const router = useRouter()
    const [page, setpage] = useState(1)
    const limit = 3

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
            setUserName(parsed.name.toUpperCase());
        }
    }, []);



    const showErrorOnce = () => {
        toast.error("All fields are required", { id: "empty-post" });
    };
    const { data, loading, refetch } = useQuery<GetPostsResponse>(getPost, { variables: { limit, page } });
    const [createPost, { loading: creating }] = useMutation(createPostt);
    const [deletePost] = useMutation(deletePostt);


    const handleCreate = async (e: any) => {
        e.preventDefault();

        if (!title.trim() || !content.trim() || !image.trim() || !excerpt.trim() || !author.trim() || !category.trim()) {
            showErrorOnce();
            return;
        }

        try {
            await createPost({
                variables: {
                    title,
                    content,
                    excerpt,
                    category,
                    image,
                    author


                },
            });

            toast.success("Post created");

            setTitle("");
            setContent("");
            setExcerpt("");
            setCategory("");
            setImage("");
            setAuthor("")
            setpreview("")
            refetch();
        } catch (err: any) {
            toast.error(err.message);
        }
    };


    const handleDelete = async (id: string) => {
        try {
            await deletePost({ variables: { id } });
            toast.success("Post deleted");
            refetch();
        } catch (err: any) {
            toast.error(err.message);
        }
    };
    const handlemypost = () => {
        router.push("/dashboard/new")
    }

    const handlelogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            toast.success("Logout successful");
            router.push("/login");
        } catch (err: any) {
            toast.error("Logout failed");
            console.error(err);
        }
    };
    const handlehome = () => {

        router.push("/Home");
    }
    const filteredPosts =
        data?.posts?.posts?.filter((post) => {
            const q = search.toLowerCase();

            return (
                post.title.toLowerCase().includes(q) ||
                post.category.toLowerCase().includes(q) ||
                post.author.toLowerCase().includes(q)
            );
        }) || [];

    const nextPage = () => {
        if (page < (data?.posts?.totalpages || 1)) {
            setpage((prev) => prev + 1);
        }
    };
    const prevPage = () => {
        if (page > 1) {
            setpage((prev) => prev - 1);
        }
    }
    useEffect(() => {
        refetch({ page, limit });
    }, [page]);
    const totalPages = data?.posts?.totalpages ?? 1;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2);


    return (
        <div className="w-full min-h-screen px-6 py-6 space-y-6 bg-white">
            <div className='flex bg-white/85 items-center justify-between py-4 px-35 sticky top-0 backdrop-blur-md z-50' >
                <div className='flex items-center gap-2'>
                    <div><button className='bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 text-white  py-2 rounded-lg px-[7px] text-[20px] '> <BiCarousel></BiCarousel></button></div>
                    <div>
                        <h1 className='text-[18px] text-[#000] font-medium'>Blog Dashboard</h1>
                        <h6 className='text-[11px] text-gray-400 font-medium'>Manage your content</h6>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <button className='bg-gray-200 flex text-[12px] text-black items-center gap-1  py-2 rounded-lg px-[20px] '> <BiUser className='text-[15px]'></BiUser>{userName}</button>
                    <button onClick={handlehome} className='bg-transparent flex text-[12px] text-black gap-1 items-center py-2 rounded-lg px-[20px] hover:bg-gray-200 border border-gray-200'><BiHome className='text-[15px]' ></BiHome>Home</button>
                    <button onClick={handlemypost} className='bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 text-white  py-2 rounded-lg px-[20px] hover:shadow-lg '>+ New Post</button>
                    <button onClick={handlelogout} className='bg-transparent text-black  py-2 rounded-lg px-[20px] hover:text-red-600 hover:bg-pink-100 '><BiLogOut className='text-[15px]'></BiLogOut></button>

                </div>
            </div>
            <div className="flex gap-6 py-4 px-35">

                <div className="flex-1 bg-white text-black p-6 rounded-lg shadow flex flex-col items-center justify-center border border-gray-200">
                    <h3 className="text-[15px] font-medium text-gray-500">Total Posts</h3>
                    <p className="text[20px] font-bold mt-2">{data?.posts?.total || 0}</p>
                </div>


                <div className="flex-1 bg-white text-black p-6 rounded-lg shadow flex flex-col items-center justify-center border border-gray-200">
                    <h3 className="text-[15px] font-medium  text-gray-500">Categories</h3>
                    <p className="text[20px] font-bold mt-2">
                        {data
                            ? new Set(data.posts.posts.map((post) => post.category)).size
                            : 0}
                    </p>
                </div>


                <div className="flex-1 bg-white text-black p-6 rounded-lg shadow flex flex-col items-center justify-center border border-gray-200">
                    <h3 className="text-[15px] font-medium  text-gray-500">Authors</h3>
                    <p className="text[20px] font-bold mt-2">
                        {data
                            ? new Set(data.posts.posts.map((post) => post.author)).size
                            : 0}
                    </p>
                </div>
            </div>
            <div className='py-4 px-35'>
                <div className='rounded-lg border border-gray-200 h-20 py-3 px-4  flex'>
                    <div className='flex items-center rounded-lg border border-gray-200 w-[100%] focus-within:border focus-within:border-blue-400'>
                        <BiSearch className='text-[25px]'></BiSearch>
                        <input value={search}
                            onChange={(e) => setSearch(e.target.value)} className='w-[500px] h-[40px] border border-none outline-0' type="text" placeholder='Search Post By Title, Category, or Author...' />
                    </div>
                </div>
            </div>
            <div className="space-y-4 py-4 px-35">
                <h2 className="text-xl font-semibold">Your Posts</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <ThreeDots
                            height="60"
                            width="60"
                            color="#3b82f6" // blue-600
                            ariaLabel="loading table"
                            visible={true}
                        />
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">No posts found</p>
                ) : (
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-x-auto bg-white rounded-xl shadow"
                    >
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Author</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filteredPosts.map((post: Post) => (
                                    <tr key={post.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            {post.image && (
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            )}
                                            <span className="font-medium text-gray-900">{post.title}</span>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">{post.author}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center gap-2">
                                            <button
                                                onClick={() => router.push(`/dashboard/new?id=${post.id}`)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">


                <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-md text-sm ${page === 1 ? "bg-gray-200 text-black cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
                >
                    Prev
                </button>


                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => setpage(p)}
                        className={`px-3 py-1 rounded-md text-sm border
                         ${page === p ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-none outline outline-blue-200 hover:bg-gray-100"}`}
                    >
                        {p}
                    </button>
                ))}


                <button
                    onClick={nextPage}
                    disabled={page >= totalPages}
                    className={`px-3 py-1 rounded-md text-sm
                     ${page >= totalPages ? "bg-gray-200 text-black cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default dashboard