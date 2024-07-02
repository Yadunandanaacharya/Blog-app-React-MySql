import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Menu = ({category}) => {
  const [posts,setPosts] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`http://localhost:8800/api/posts/?category=${category}`);
        setPosts(response.data);
      }catch(err){
        console.log(err);
      }
    };

    fetchData();
  },[category]);
    
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post=>(
            <div className="post" key={post.post_id}>
                <img src={`http://localhost:8800/uploads/${post.post_img}`} alt="" />
                {/* <img src={post.post_img} alt="" /> */}
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu