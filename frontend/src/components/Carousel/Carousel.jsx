import { Children, useState } from "react";
import "./carousel.style.css"

function Carousel({ children }) {
  const [imgIndex, setImgIndex] = useState(0)
  const arrayOfChildren = Children.toArray(children)

  const handleIncrease = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (imgIndex === (arrayOfChildren.length - 1)) {
      return setImgIndex(0)
    }
    setImgIndex(imgIndex + 1)
  }

  const handleDecrease = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (imgIndex === 0) {
      return
    }
    setImgIndex(imgIndex - 1)
  }


  return (
    <div className="carousel-container">
      {
        arrayOfChildren.length > 1 &&
        <div className="carousel-buttons">
          <button className="carousel-button" onClick={handleDecrease}>{`<`}</button>
          <button className="carousel-button" onClick={handleIncrease}>{`>`}</button>
        </div>
      }
      <div className="carousel-number">{`${imgIndex+1}/${arrayOfChildren.length}`}</div>
      {arrayOfChildren[imgIndex]}

    </div>
  )

}

export default Carousel;