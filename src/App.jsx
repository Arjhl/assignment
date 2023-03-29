import styles from "./App.module.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { useNavigate } from "react-router-dom";

function App() {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=all");

      const data = await res.json();

      console.log(data);
      await setMovieList(data);
    }
    fetchData();
  }, []);

  const clickHandler = (data) => {
    console.log("d", data);
    navigate(`/${data}`);
  };

  const movieToBeRendered = movieList.map((d) => {
    return (
      <Card
        key={d.show.id}
        id={d.show.id}
        img={d.show.image?.original ? d.show.image?.original : ""}
        movieName={d.show.name}
        rating={d.show.rating.average}
        movieType={d.show.type}
        data={d}
        clickHandler={clickHandler}
      />
    );
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.main_head}>SHOWTIME 🍿</h1>
      {movieToBeRendered}
    </div>
  );
}

export default App;
