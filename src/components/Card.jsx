import styles from "./Card.module.css";

const Card = (props) => {
  console.log(props.id);

  const clickHandler = () => {
    props.clickHandler(props.id);
  };

  return (
    <section onClick={clickHandler} className={styles.card}>
      <div className={styles.card_img}>
        <img
          src={
            props.img
              ? props.img
              : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80"
          }
          alt={`Poster of the movie - ` + props.movieName}
        />
      </div>
      <h1 className={styles.card_head}>{props.movieName}</h1>
      <p className={styles.card_desc}>{props.movieType}</p>
    </section>
  );
};

export default Card;
