import React, { useState, useEffect } from 'react'
import MovieItem from '../components/MovieItem'
import axios from 'axios'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

const HomePage = () => {
  const [movies, setMovies] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const fetchData = async () => {
    const resp = await axios.get(
      'https://localhost:5001/api/Movie/getallmovies'
    )
    setMovies(resp.data)
  }

  const removeMovieFromList = movie => {
    setMovies(prev => {
      return [...movies.filter(m => m.id !== movie.id)]
    })
  }

  const sortAbc = (a, b) => {
    var titleA = a.title.toUpperCase()
    var titleB = b.title.toUpperCase()
    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }
    return 0
  }

  const sortDirector = (a, b) => {
    var directorA = a.director.toUpperCase()
    var directorB = b.director.toUpperCase()
    if (directorA < directorB) {
      return -1
    }
    if (directorA > directorB) {
      return 1
    }
    return 0
  }

  const sortCreation = (a, b) => {
    if (a.id < b.id) {
      return -1
    }
    if (a.id > b.id) {
      return 1
    }
    return 0
  }

  const sortMovies = sortBy => {
    console.log(sortBy)
    if (sortBy === 'title') {
      // sort using sortAbc
      setMovies([...movies.sort(sortAbc)])
    } else if (sortBy === 'director') {
      setMovies([...movies.sort(sortDirector)])
    } else {
      setMovies([...movies.sort(sortCreation)])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <header>
        <h1>Library</h1>
      </header>
      <Dropdown
        id="dropdown-basic-button"
        isOpen={dropdownOpen}
        toggle={toggle}
        className="dropdown"
        size="sm"
      >
        <DropdownToggle caret className="dropdown">
          Sort by
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Year</DropdownItem>
          <DropdownItem onClick={() => sortMovies('director')}>
            Director
          </DropdownItem>
          <DropdownItem onClick={() => sortMovies()}>
            Creation Date
          </DropdownItem>
          <DropdownItem onClick={() => sortMovies('title')}>A-Z</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ul className="displayMovie">
        {movies.map(movie => {
          return (
            <MovieItem {...movie} removeMovieFromList={removeMovieFromList} />
          )
        })}
      </ul>
      <footer></footer>
    </>
  )
}

export default HomePage
