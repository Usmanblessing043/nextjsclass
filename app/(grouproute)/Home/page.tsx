

import React from 'react'

import { BiEnvelope, BiBookOpen, BiCarousel, BiCode, BiListPlus, BiChart, BiLike } from "react-icons/bi";

function Home() {
  return (
    <div>
      <div className='flex bg-white/85 items-center justify-between py-4 px-50 sticky top-0 backdrop-blur-md z-50' >
        <div className='flex items-center gap-2'>
          <div><button className='bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 text-white  py-2 rounded-lg px-[7px] text-[20px] '> <BiCarousel></BiCarousel></button></div>
          <div>
            <h1 className='text-[18px] text-[#000] font-medium'>The Modern Blog</h1>
            <h6 className='text-[11px] text-gray-400 font-medium'>Your daily inspiration</h6>
          </div>
        </div>
        <div className='flex gap-5 items-center'>
          <h1 className='text-[14px] text-[#000] font-medium'>Home</h1>
          <h1 className='text-[14px] text-[#000] font-medium'>Categories</h1>
          <h1 className='text-[14px] text-[#000] font-medium'>About</h1>
          <button className='bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 text-white  py-2 rounded-lg px-[20px] '>Subscribe</button>
        </div>
      </div>
      <div className='bg-gray-100 py-20 px-50 space-y-6'>
        <button className='bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 text-white  py-2 rounded-full px-[20px] '>Welcome to our community 👋</button>
        <h1 className='text-5xl font-bold bg-gradient-to-r from-purple-500   via-pink-500 to-red-500 bg-clip-text text-transparent'>Discover Stories That Inspire</h1>
        <p className='text-[15px] text-gray-500 font-medium' >Join over 50,000 readers who get fresh perspectives on technology, design, lifestyle, <br /> and more. Stay informed, stay inspired.</p>
        <div className='flex gap-5'>
          <button className=' flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 text-white  py-2 rounded-lg px-[20px] shadow-none hover:shadow-lg transition-shadow duration-300'><BiEnvelope className='text-2xl'></BiEnvelope><h1 className='text-[13px]'>Get Weeekly Newsletter</h1></button>
          <button className=' flex items-center gap-2 bg-trasparent text-blue-600 border border-blue-500  py-2 rounded-lg px-[20px] transition-colors duration-300 hover:bg-blue-100 '><BiBookOpen className='text-2xl'></BiBookOpen><h1 className='text-[13px]'>Start Reading</h1></button>

        </div>

      </div>
      <div className=' flex px-70 py-20 justify-between bg-gradient-to-r from-blue-500   via-purple-500 to-red-500'>
        <div className='flex flex-col items-center'>
          <h1 className='text-[24px] text-[#fff] font-medium'>50K+</h1>
          <p className='text-[15px] text-gray-300 font-medium'>Readers</p>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='text-[24px] text-[#fff] font-medium'>1,200+</h1>
          <p className='text-[15px]  text-gray-300 font-medium'>Articles</p>
        </div>
        <div className='flex flex-col items-center '>
          <h1 className='text-[24px] text-[#fff] font-medium'>25+</h1>
          <p className='text-[15px]  text-gray-300 font-medium'>Writers</p>
        </div>
        <div className='flex flex-col   items-center'>
          <h1 className='text-[24px] text-[#fff] font-medium'>98%</h1>
          <p className='text-[15px]  text-gray-300  font-medium'>Satisfaction</p>
        </div>

      </div>
      <div className='  justify-center items-center bg-[#fff] px-50 py-20'>
        <h1 className=' flex justify-center text-[24px] text-[#000] font-medium items-center'>Explore Topics</h1>
        <h6 className=' flex justify-center text-[gray] font-medium items-center'>Dive into content that matters to you</h6>
        <br />
        <div className='flex justify-between '>
          <button className='bg-blue-600 text-white  py-10 rounded-lg px-[45px] text-[20px] flex flex-col items-start  '>
            <div className='flex gap-4 justify-between'><BiCode></BiCode> <h5 className='text-[13px]'>240 posts</h5></div>
            <h1 className='text-[17px]'>Technology</h1>
          </button>
          <button className='bg-purple-600 text-white  py-10 rounded-lg px-[45px] text-[20px] flex flex-col items-start  '>
            <div className='flex gap-4 justify-between' ><BiCode></BiCode> <h5 className='text-[13px]'>740 posts</h5></div>
            <h1 className='text-[17px]'>Design</h1>
          </button>
          <button className='bg-green-600 text-white  py-10 rounded-lg px-[45px] text-[20px] flex flex-col items-start  '>
            <div className='flex gap-4 justify-between'><BiCode></BiCode> <h5 className='text-[13px]'>840 posts</h5></div>
            <h1 className='text-[17px]'>Lifestyle</h1>
          </button>
          <button className='bg-orange-600 text-white  py-10 rounded-lg px-[45px] text-[20px] flex flex-col items-start  '>
            <div className='flex gap-4 justify-between'><BiCode></BiCode> <h5 className='text-[13px]'>240 posts</h5></div>
            <h1 className='text-[17px]'>Food</h1>
          </button>
          <button className='bg-red-600 text-white  py-10 rounded-lg px-[45px] text-[20px] flex flex-col items-start  '>
            <div className='flex gap-4 justify-between'><BiCode></BiCode> <h5 className='text-[13px]'>540 posts</h5></div>
            <h1 className='text-[17px]'>Travel</h1>
          </button>
          <button className='bg-green-800 text-white  py-10 rounded-lg px-[45px] text-[20px] flex flex-col items-start  '>
            <div className='flex gap-4 justify-between'><BiCode></BiCode> <h5 className='text-[13px]'>770 posts</h5></div>
            <h1 className='text-[17px]'>Health</h1>
          </button>

        </div>
        <br />
        <div className='flex '>
          <div className='h-120 w-1/2  bg-gradient-to-tr from-yellow-500 via-purple-500 to-orange-500 rounded-tl-lg rounded-bl-lg'></div>
          <div className='h-120 w-1/2 bg-purple-700 rounded-tr-lg rounded-br-lg px-10 py-20' >
            <button className='bg-purple-500 py-1 rounded-full px-[12px] text-[12px]'>⭐ Featured Article</button>
            <h1 className='text-2xl font-bold'>The Future of Creative Work in the AI <br /> Era</h1>
            <br />
            <h3 className=''>Discover how artificial intelligence is transforming creative industries and what it means for designers, writers, and artists. Learn strategies to thrive in this new landscape.</h3>
            <br />
            <div className='flex gap-3'>
              <div className='h-10 w-10 rounded-full bg-purple-500 flex justify-center items-center text-[15px] '>SJ</div>
              <div>
                <h1 className=''>Sarah Johnson</h1>
                <h5 className='text-gray-400 text-[12px]'>Feb 3, 2026 • 10 min read</h5>
              </div>
            </div>
            <br />
            <button className='text-blue-700 bg-white py-2 px-4 rounded-lg'>Read Full Article →</button>
          </div>
        </div>
      </div>
      <div className='  justify-center items-center bg-[#fffffff3] px-50 py-20'>
        <h1 className=' flex justify-center text-[24px] text-[#000] font-medium items-center'>Why Readers Love Us</h1>
        <h6 className=' flex justify-center text-[gray] font-medium items-center'>Quality content that makes a difference</h6>
        <br />
        <div className='flex justify-between items-center'>
          <div className='h-50 w-90 bg-white px-5 py-10 rounded-xl hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <button className='bg-blue-500 px-4 py-4 text-3xl rounded-xl'><BiListPlus></BiListPlus></button>
            <h1 className=' text-black text-[17px] font-bold'>Expert Writers</h1>
            <h5 className='text-[13px] text-gray-400'>Content created by industry professionals and <br /> thought leaders who share their real-world insights.</h5>
          </div>
          <div className='h-50 w-90 bg-white px-5 py-10 rounded-xl  hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <button className='bg-purple-500 px-4 py-4 text-3xl rounded-xl'><BiChart></BiChart></button>
            <h1 className=' text-black text-[17px] font-bold'>Fresh Content Daily</h1>
            <h5 className='text-[13px] text-gray-400'>New articles published every day covering the latest <br /> trends and timeless wisdom.</h5>
          </div>
          <div className='h-50 w-90 bg-white px-5 py-10 rounded-xl  hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <button className='bg-red-500 px-4 py-4 text-3xl rounded-xl'><BiLike></BiLike></button>
            <h1 className=' text-black text-[17px] font-bold'>Community Driven</h1>
            <h5 className='text-[13px] text-gray-400'>Join discussions, share your thoughts, and connect <br />with like-minded readers from around the world.</h5>
          </div>
        </div>
      </div>
      <div className='px-50 py-20 bg-white'>
        <div className='flex justify-between'>
          <div>
            <h1 className=' text-[24px] text-[#000] font-medium '>Latest Articles</h1>
            <h5 className='  text-[gray] font-medium '>Fresh perspectives on topics that matter</h5>
          </div>
          <button className=' h-10 w-30 text-black   rounded-lg px-[19px] text-[15px] hover:bg-gray-200 border border-black'>View All →</button>

        </div>
        <br />
        <div className='grid grid-cols-3 gap-6'>
          <div className='h-130 w-92 bg-white rounded-xl border border-gray-500 hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <img className='rounded-tl-lg rounded-tr-lg h-45 w-92' src="/images/tech.jpeg" alt="" />
            <div className='px-6 py-10' >
              <div className='flex items-center gap-3'>
                <button className='bg-blue-500 text-white rounded-xl text-[12px] px-3 py-0.5'>Technology</button>
                <h6 className='text-[11px] text-gray-400'>5 min read</h6>
              </div>
              <br />
              <h1 className='text-black text-[19px] font-medium'>Getting Started with Modern Web Development</h1>
              <br />
              <h2 className='text-gray-400 text-[15px]' >Explore the latest trends and best practices in web development. Learn about the tools and frameworks that are shaping the future of the...</h2>
              <hr />
              <br />
              <div className='flex gap-3'>
                <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-[15px] '>S</div>
                <div>
                  <h1 className='text-black'>Sarah Johnson</h1>
                  <h5 className='text-gray-400 text-[12px]'>Feb 3, 2026</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='h-130 w-92 bg-white rounded-xl border border-gray-500 hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <img className='rounded-tl-lg rounded-tr-lg h-45 w-92' src="/images/design.jpeg" alt="" />
            <div className='px-6 py-10' >
              <div className='flex items-center gap-3'>
                <button className='bg-purple-500 text-white rounded-xl text-[12px] px-3 py-0.5'>Design</button>
                <h6 className='text-[11px] text-gray-400'>9 min read</h6>
              </div>
              <br />
              <h1 className='text-black text-[19px] font-medium'>The Art of Minimalist Design</h1>
              <br />
              <h2 className='text-gray-400 text-[15px]' >Discover how minimalism in design can create powerful and impactful user experiences. Less is often more when it comes to creating...</h2>
              <hr />
              <br />
              <div className='flex gap-3'>
                <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-[15px] '>M</div>
                <div>
                  <h1 className='text-black'>Michael Chen</h1>
                  <h5 className='text-gray-400 text-[12px]'>Feb 1, 2026</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='h-130 w-92 bg-white rounded-xl border border-gray-500 hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <img className='rounded-tl-lg rounded-tr-lg h-45 w-92' src="/images/health.jpeg" alt="" />
            <div className='px-6 py-10' >
              <div className='flex items-center gap-3'>
                <button className='bg-green-500 text-white rounded-xl text-[12px] px-3 py-0.5'>Health</button>
                <h6 className='text-[11px] text-gray-400'>6 min read</h6>
              </div>
              <br />
              <h1 className='text-black text-[19px] font-medium'>Health and Wellness Tips for 2026</h1>
              <br />
              <h2 className='text-gray-400 text-[15px]' >Start your wellness journey with expert advice on fitness, nutrition, and mental health. Build sustainable habits for a healthier lifestyle....</h2>
              <hr />
              <br />
              <div className='flex gap-3'>
                <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-[15px] '>A</div>
                <div>
                  <h1 className='text-black'>Aderemi Adams</h1>
                  <h5 className='text-gray-400 text-[12px]'>Feb 3, 2026</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='h-130 w-92 bg-white rounded-xl border border-gray-500 hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <img className='rounded-tl-lg rounded-tr-lg h-45 w-92' src="/images/life.jpeg" alt="" />
            <div className='px-6 py-10' >
              <div className='flex items-center gap-3'>
                <button className='bg-green-500 text-white rounded-xl text-[12px] px-3 py-0.5'>Lifestyle</button>
                <h6 className='text-[11px] text-gray-400'>4 min read</h6>
              </div>
              <br />
              <h1 className='text-black text-[19px] font-medium'>Finding Inspiration in Nature</h1>
              <br />
              <h2 className='text-gray-400 text-[15px]' >Nature has always been a source of inspiration for creativity. Learn how to incorporate natural elements into your work and find balance in...</h2>
              <hr />
              <br />
              <div className='flex gap-3'>
                <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-[15px] '>T</div>
                <div>
                  <h1 className='text-black'>Tunde John</h1>
                  <h5 className='text-gray-400 text-[12px]'>Feb 1, 2026</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='h-130 w-92 bg-white rounded-xl border border-gray-500 hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <img className='rounded-tl-lg rounded-tr-lg h-45 w-92' src="/images/food.jpeg" alt="" />
            <div className='px-6 py-10' >
              <div className='flex items-center gap-3'>
                <button className='bg-orange-500 text-white rounded-xl text-[12px] px-3 py-0.5'>Food</button>
                <h6 className='text-[11px] text-gray-400'>9 min read</h6>
              </div>
              <br />
              <h1 className='text-black text-[19px] font-medium'>Delicious Recipes for Every Season</h1>
              <br />
              <h2 className='text-gray-400 text-[15px]' >Discover seasonal recipes that bring joy to your table. From fresh summer salads to cozy winter soups, find inspiration for your next...</h2>
              <hr />
              <br />
              <div className='flex gap-3'>
                <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-[15px] '>T</div>
                <div>
                  <h1 className='text-black'>Taiwo son</h1>
                  <h5 className='text-gray-400 text-[12px]'>Feb 3, 2026</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='h-130 w-92 bg-white rounded-xl border border-gray-500 hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300'>
            <img className='rounded-tl-lg rounded-tr-lg h-45 w-92 ' src="/images/travel.jpeg" alt="" />
            <div className='px-6 py-10' >
              <div className='flex items-center gap-3'>
                <button className='bg-pink-500 text-white rounded-xl text-[12px] px-3 py-0.5'>Travel</button>
                <h6 className='text-[11px] text-gray-400'>50 min read</h6>
              </div>
              <br />
              <h1 className='text-black text-[19px] font-medium'>Travel Adventures Around the World</h1>
              <br />
              <h2 className='text-gray-400 text-[15px]' >Explore breathtaking destinations and hidden gems across the globe. Get inspired to plan your next adventure with our comprehensive...</h2>
              <hr />
              <br />
              <div className='flex gap-3'>
                <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-[15px] '>J</div>
                <div>
                  <h1 className='text-black'>John Ade</h1>
                  <h5 className='text-gray-400 text-[12px]'>Feb 3, 2026</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        

      </div>
      <div className=' bg-gradient-to-br from-blue-700 via-purple-500 to-pink-500 px-50 py-25 gap-5 flex flex-col justify-center items-center'>
        <div className='h-15 w-15 rounded-full bg-purple-500 flex justify-center items-center text-[25px] '><BiEnvelope></BiEnvelope></div>
        <h1 className='text-[22px] font-bold text-white'>Never Miss a Story</h1>
        <h5>Subscribe to our newsletter and get the best articles delivered straight to your inbox every week.</h5>
        <div className='flex gap-6'>
          <input className='bg-transparent border border-gray-600 rounded-lg px-3 py-3' type="text" placeholder='Enter your email' />
          <button className='bg-white text-blue-600 px-6 py-3 rounded-lg font-medium'>Subscribe</button>
        </div>
        <h6 className='text-[12px]'>Join 50,000+ subscribers. Unsubscribe anytime.</h6>
      </div>
    </div>
  )
}

export default Home








