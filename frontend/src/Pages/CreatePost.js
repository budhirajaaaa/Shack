import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthProvider";

const CreatePost = () => {
  const [title,setTitle] =useState("")
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

const {token} =useAuth()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", text);
    formData.append("title",title)
    if (image) formData.append("image", image);
    try{
    let response = await fetch("http://localhost:4000/api/post/createPost",{
      method:"POST",
      body:formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    response = await response.json();
    console.log("Submitted:", { text, image });
    alert("Post submitted!");
    setText("");
    setImage(null);
    setPreview(null);
    setTitle("")
  }
  catch(err){
    console.log(err)
  }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h4 className="card-title mb-3">Create Post</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <div class="input-group mb-2">
  <span class="input-group-text">Title</span>
  <input type="text" aria-label="Title" class="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} required/>

</div>
              <textarea
                className="form-control"
                rows="4"
                placeholder="What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            {preview && (
              <div className="mb-3 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              Post
            </button>
    
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
