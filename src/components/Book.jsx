import react from "react";

const Book=() => {
  return(
    <>
      <div className="book">
        <img src="./images/book.jpg" alt="" />
        <div className="bottom">
          <h3 className="title">React JS</h3>
          <p className="amount">3290</p>
        </div>
      </div>
    </>
  )
}

export default Card;