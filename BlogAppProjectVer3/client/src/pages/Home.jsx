import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [posts,setPosts] = useState([])
  // const location = useLocation(); //gives all location object of navbar category
  const category = useLocation().search; 

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`http://localhost:8800/api/posts/${category}`);
        setPosts(response.data);
      }catch(err){
        console.log(err);
      }
    };

    fetchData();
  },[category]);

  const getTextFromHtml = (html)=>{
    const doc = new DOMParser().parseFromString(html,"text/html");
    return doc.body.textContent;
  }

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map(post=>(
          <div className='post' key={post.id}>
              <div className='img'>
                <img src={`http://localhost:8800/uploads/${post.post_img}`} alt='' />
              </div>
              <div className='content'>
                <Link className='link' to={`/post/${post.post_id}`}>
                <h1>{post.title}</h1>
                </Link>
                <p>{getTextFromHtml(post.desc)}</p>
                <button>Read more</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home