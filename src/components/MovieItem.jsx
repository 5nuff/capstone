import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MovieItem = props => {
  const [isClicked, setIsClicked] = useState(false)
  const deleteMovie = async () => {
    const resp = await axios.delete(
      `https://localhost:5001/api/Movie/${props.id}`
    )
    if (resp.status === 200) {
      props.removeMovieFromList({ ...props })
    }
  }

  return (
    <section className="all">
      <section className="visible">
        <img
          id="poster"
          className="poster"
          src={props.poster}
          onClick={() => setIsClicked(prev => !prev)}
        ></img>
        <h2 className="title" onClick={() => setIsClicked(prev => !prev)}>
          {props.title}
        </h2>
        <p className="directorYear">
          {props.director} ∘ {props.year}
        </p>
      </section>
      <p id="genre" className={isClicked ? 'expand' : 'hidden'}>
        {props.genre}
      </p>
      <section className="HUD">
        <p id="file" className={isClicked ? 'expand' : 'hidden'}>
          {props.file}
        </p>
        <p id="duration" className={isClicked ? 'expand' : 'hidden'}>
          {props.duration}
        </p>
        <button
          id="delete"
          className={isClicked ? 'expand' : 'hidden'}
          onClick={() => deleteMovie()}
        >
          Delete
        </button>
      </section>
    </section>
  )
}

export default MovieItem
