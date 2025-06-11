import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import "./PostCard.css";
import { jwtDecode } from "jwt-decode";

export default function PostCard({ data, setPost }) {
  const [comment, setComment] = useState("");
  const { token } = useAuth();
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const handleLike = async (id) => {
    let response = await fetch(
      `http://localhost:4000/api/post/likePost/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    response = await response.json();
    setPost((prevPost) => prevPost.map((e) => (e._id === id ? response : e)));
  };
  const handleComment = async (id) => {
    let response = await fetch(`http://localhost:4000/api/post/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: comment }),
    });
    response = await response.json();
    setPost((prevPost) => prevPost.map((e) => (e._id === id ? response : e)));
  };
  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };
  const isLiked = useMemo(() => data.likes.includes(userId), [data, userId]);

  return (
    <div className="postCard">
      <div className="nameHeader">
        <img alt="Daksh" src="logo192.png" />
        <p>{data?.author?.username}</p>
      </div>
      <div className="postImg">
        <div className="postCaption">
          <p>{data.content}</p>
        </div>
        <div className="imageContainer">
          <img alt="postImg" src={`http://localhost:4000${data.image}`} />
        </div>
      </div>
      <div className="interactionIcons">
        <span
          className="material-icons customIcons"
          onClick={() => handleLike(data._id)}
        >
          {isLiked ? "favorite" : "favorite_border"}
        </span>
      </div>
      <div className="commentSection">
        <input
          type="text"
          placeholder="Comment..."
          value={comment}
          name="comment"
          onChange={handleCommentInput}
        />
        <span class="material-icons" onClick={() => handleComment(data._id)}>
          send
        </span>
        {data.comment.map((e) => {
          return (
            <div key={e._id}>
              <div>
                <span>{e.user.username}</span>
              </div>
              <div>{e.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
