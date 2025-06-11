import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

import "./Home.css";
import PostCard from "../components/PostCard";
import News from "../components/News";

export default function Home() {
  const { token } = useAuth();
  const [post, setPost] = useState([]);
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function getAllPost(params) {
      let response = await fetch("http://localhost:4000/api/post/getAllPost", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response = await response.json();
      setPost(response);
      console.log(response);
    }
    async function getNews(params) {
      let response = await fetch(
        "https://newsapi.org/v2/top-headlines?q=india&apiKey=67877fde83bc488c80d9ee5d124babad",
        {
          method: "GET",
        }
      );
      response = await response.json();
      setNews(response);
    }
    getAllPost();
    getNews();
  }, []);
  return (
    <div className="homePage">
      <div className="allPost">
        {post.map((e) => {
          return <PostCard key={e._id} data={e} setPost={setPost} />;
        })}
      </div>
      <div>
        <News data={news} />
      </div>
    </div>
  );
}
