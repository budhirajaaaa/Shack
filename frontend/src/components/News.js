import "./News.css";

export default function News({ data }) {
  return (
    <div className="newsComponent">
      {data?.articles?.map((e) => {
        return (
          <div className="news">
            <div className="imageContainer">
              <img src={e.urlToImage} />
            </div>
            <div className="newsContainer">
              <h6>{e.title}</h6>
              <p>{e.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
