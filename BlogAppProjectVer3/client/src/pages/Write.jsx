import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || "");
  const navigate  = useNavigate();
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data;
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();
    try {
      const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
      state
       ? await axios.put(`http://localhost:8800/api/posts/${state.post_id}`, {
        title,
         desc: value,
         category,
         img: file ? imgUrl : "",
      }, { withCredentials: true }) :
        await axios.post(`http://localhost:8800/api/posts/`, {
          title,
           desc: value,
           category,
           img: file ? imgUrl : "",
           date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        }, { withCredentials: true });
        navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  console.log(value);
  return (
    <div className='writeAdd'>
      <div className="content">
        <input type='text' value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          {/* for below he told it's editor */}
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />;
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input style={{ display: "none" }} type='file' name="" id="file"
            onChange={e => setFile(e.target.files[0])}></input>
          <label className='lblFile' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className='category'>
            <input type='radio' checked={category === 'art'} name='catego' value='art' id='art' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='art'>Art</label>
          </div>
          <div className='category'>
            <input type='radio' checked={category === 'science'} name='catego' value='science' id='science' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='science'>Science</label>
          </div>
          <div className='category'>
            <input type='radio' checked={category === 'technology'} name='catego' value='technology' id='technology' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='category'>
            <input type='radio' checked={category === 'cinema'} name='catego' value='cinema' id='cinema' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='category'>
            <input type='radio' checked={category === 'design'} name='catego' value='design' id='design' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='design'>Design</label>
          </div>
          <div className='category'>
            <input type='radio' checked={category === 'food'} name='catego' value='food' id='food' onChange={e => setCategory(e.target.value)} />
            <label htmlFor='food'>food</label>
          </div >
        </div >
      </div >
    </div >
  )
}

export default Write