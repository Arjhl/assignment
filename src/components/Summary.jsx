import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./summary.module.css";
import parse from "html-react-parser";

const Summary = () => {
  const params = useParams();
  const [movieSummary, setMovieSummary] = useState();
  const navigate = useNavigate();

  //   console.log(params.movieId);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=all");

      const data = await res.json();

      let flag = false;

      data.map((d) => {
        if (Number(d.show.id) === Number(params.movieId)) {
          setMovieSummary(d.show);
          console.log(d.show);
          flag = true;
        }
      });

      if (!flag) {
        navigate("/404");
      }
    }
    fetchData();
  }, []);

  const book = () => {
    navigate(`/${params.movieId}/book`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mov_img}>
        <img src={movieSummary?.image.original} alt="" />
        <p className={styles.mov_summary}>
          {parse(movieSummary?.summary ? movieSummary.summary : "")}
        </p>
      </div>
      <h1 className={styles.mov_name}>{movieSummary?.name}</h1>
      <div className={styles.mov_about}>
        <p className={styles.mov_type}>{movieSummary?.type}</p>
        <p className={styles.mov_rating}>{movieSummary?.rating.average}</p>
      </div>

      <div className={styles.mov_schedule}>
        <p className={styles.mov_day}>{movieSummary?.schedule.days[0]}</p>
        <p className={styles.mov_time}>{movieSummary?.schedule.time}</p>
      </div>

      <button onClick={book} className={styles.mov_book}>
        Book Now
      </button>
    </div>
  );
};

export default Summary;
