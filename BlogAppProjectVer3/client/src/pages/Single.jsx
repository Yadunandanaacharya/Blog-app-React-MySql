import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import ProfilePhoto from '../img/katrina.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({})
  const postIdIs = useLocation().pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);
  const navigate  = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/posts/${postIdIs}`);
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postIdIs]);

  const handleDelete = async () => {
    try {
      const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
      await axios.delete(`http://localhost:8800/api/posts/${postIdIs}`, {
            headers: {
                Cookie: `access_token=${cookieValue}`
            },
            withCredentials: true
        });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getTextFromHtml = (html)=>{
    const doc = new DOMParser().parseFromString(html,"text/html");
    return doc.body.textContent;
  }

  return (
    <div className='single'>
      <div className='content'>
        {/* <img src={post?.post_img} alt='' /> */}
        <img src={`http://localhost:8800/uploads/${post?.post_img}`} alt='' />
        {/* `http://localhost:8800/uploads/${post.post_img}` */}
        <div className="user">
          {post.user_img && <img src={post?.user_img} alt='' />}
          <div className="info">
            <span>{post.user_name}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.user_name === post.user_name &&
            <div className='edit'>
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </Link>
            </div>
          }
        </div>
        <h1>{post.title}</h1>
        {getTextFromHtml(post.desc)}
      </div>
        <Menu category={post.category}/>
    </div>
  )
}

export default Single