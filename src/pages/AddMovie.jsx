import React, { useState, useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

const AddMovie = () => {
  const [movie, setMovie] = useState({
    file: '',
    title: '',
    year: '',
    director: '',
    genre: '',
    poster: '',
    duration: '',
  })
  const [movieId, setMovieId] = useState()

  const [
    wasMovieCreatedSuccessfully,
    setWasMovieCreatedSuccessfully,
  ] = useState(false)

  const updateMovieObject = e => {
    e.persist()
    setMovie(prevMovie => ({
      ...prevMovie,
      [e.target.name]: e.target.value,
    }))
  }

  const submitMovie = async e => {
    e.preventDefault()

    const isValid = Object.keys(movie).reduce((acc, key) => {
      return acc && movie[key] !== ''
    }, true)
    console.log(isValid)

    if (isValid) {
      const resp = await axios.post('https://localhost:5001/api/Movie', {
        ...movie,
        movieFile: movie.file,
      })
      console.log(resp.data)
      if (resp.status === 200) {
        setMovieId(resp.data.id)
      }
    }
  }

  useEffect(() => {
    if (movieId) {
      setWasMovieCreatedSuccessfully(true)
    }
  }, [movieId])

  const onDrop = useCallback(acceptedFiles => {
    // setMovie(prevMovie => ({
    //   ...prevMovie,
    //   [title]: acceptedFiles[0].name,
    // }))
    console.log(acceptedFiles)
    acceptedFiles.forEach(file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        console.log('working')
        const binaryStr = reader.result
        console.log(binaryStr)
        // const uint8Array = new TextDecoder('utf-8').decode(binaryStr)
        // console.log(uint8Array)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  return wasMovieCreatedSuccessfully ? (
    <Redirect to={`/movie/${movieId}`} />
  ) : (
    <>
      <h1>Details</h1>
      <ul className="inputField">
        <form onSubmit={submitMovie}>
          <div {...getRootProps()}>
            <div className="inputLabel"> File Path </div>
            <input
              {...getInputProps()}
              className="inputMovie"
              placeholder="Drop file or enter path"
              // value={movie.file}
              name="file"
            />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag n drop here, or click to select file</p>
            )}
          </div>
          <div>
            <div className="inputLabel">Poster</div>
            <input
              className="inputMovie"
              placeholder="Drop file or enter path"
              type="text"
              value={movie.poster}
              onChange={updateMovieObject}
              name="poster"
            ></input>
          </div>
          <div>
            <div className="inputLabel"> Title </div>
            <input
              className="inputMovie"
              type="text"
              value={movie.title}
              onChange={updateMovieObject}
              name="title"
            ></input>
          </div>
          <div>
            <div className="inputLabel"> Year </div>
            <input
              className="inputMovie"
              type="text"
              value={movie.year}
              onChange={updateMovieObject}
              name="year"
            ></input>
          </div>
          <div>
            <div className="inputLabel"> Director </div>
            <input
              className="inputMovie"
              type="text"
              value={movie.director}
              onChange={updateMovieObject}
              name="director"
            ></input>
          </div>
          <div>
            <div className="inputLabel">Genre</div>
            <input
              className="inputMovie"
              type="text"
              value={movie.genre}
              onChange={updateMovieObject}
              name="genre"
            ></input>
          </div>
          <div>
            <div className="inputDuration"> Duration </div>
            <input
              className="inputDuration"
              type="text"
              value={movie.duration}
              onChange={updateMovieObject}
              name="duration"
            ></input>
          </div>
          <button className="addButton" type="submit">
            Add
          </button>
        </form>
      </ul>
    </>
  )
}

export default AddMovie
