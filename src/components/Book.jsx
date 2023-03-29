import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styles from "./Book.module.css";

const Book = () => {
  const emailRef = useRef("");
  const nameRef = useRef("");
  const [data, setData] = useState();
  const [isBooked, setIsBooked] = useState(false);
  const params = useParams();
  console.log(params.movieId);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=all");

      const data = await res.json();

      data.map((d) => {
        if (Number(d.show.id) === Number(params.movieId)) {
          setData(d.show);
          console.log(d.show);
        }
      });
    }
    fetchData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("username", nameRef.current.value);
    localStorage.setItem("email", emailRef.current.value);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <p className={styles.booked}>
        {`Hurray 🎉, Ticket Booked . Thank you ${localStorage.getItem(
          "username"
        )} for choosing this platform.`}
      </p>
    );
  }
  return (
    <form onSubmit={submitHandler} className={styles.form_tag}>
      <h1>Enter Details</h1>
      <input type="text" value={data?.name} />
      <input
        type="text"
        value={data?.schedule.days[0] ? data?.schedule.days[0] : "Monday"}
      />
      <input type="text" value={data?.schedule.time} />
      <input type="text" placeholder="Name" ref={nameRef} />
      <input type="email" placeholder="Email" ref={emailRef} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Book;
