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
          <span className="likesCount">{data.likes.length}</span>
      </div>
      <div className="commentSection">
        <div className="commentInputWrapper">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            name="comment"
            onChange={handleCommentInput}
            className="commentInput"
          />
          <span className="material-icons sendIcon" onClick={() => handleComment(data._id)}>
            send
          </span>
        </div>

        <div className="commentsList">
          {data.comment.map((e) => (
            <div className="commentCard" key={e._id}>
              <div className="commentHeader">
                <strong className="commentUsername">{e.user.username}</strong>
              </div>
              <div className="commentContent">{e.content}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
