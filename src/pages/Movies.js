import React, { useCallback, useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';

const Movies = () => {
  const [number, setNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [movies, setMovies] = useState([]);
  const [select, setSelect] = useState('popularity.desc');
  const [genre, setGenre] = useState([]);
  const [dataGenre, setDataGenre] = useState();
  
  const handledSelect = (event) => {
    console.log('Selected Option:', event.target.value);
    setSelect(event.target.value);
    fetchInitialData(event.target.value);
  };
  

  const fetchInitialData = useCallback(async (selectedOption) => {
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=${selectedOption}&with_genres=${dataGenre}&api_key=${process.env.REACT_APP_API_KEY}`
      );

      const data = await movieResponse.json();

      if (data.results.length > 0) {
        setMovies(data.results);
        setNumber(2);
        setHasMore(true);
      } else {
        setMovies([]);
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [ dataGenre]);

  
  const fetchMoreData = async () => {
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${number}&sort_by=${select}&with_genres=${dataGenre}&api_key=${process.env.REACT_APP_API_KEY}`
      );
  
      const data = await movieResponse.json();
  
      if (data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setNumber((prevNumber) => prevNumber + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const fetchGenre = async () => {
    
    try {
      let response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${process.env.REACT_APP_API_KEY}`);
      let data = await response.json();
  
      if (data.genres) {
        setGenre(data.genres);
      } else {
        console.error('Invalid response format from Genre API:', data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  

  useEffect(() => {
    fetchInitialData("popularity.desc"); 
    fetchGenre()
  }, [ fetchInitialData ]);
  
  const handleGenre = (selectedGenres) => {
    setDataGenre(selectedGenres.join(','));
  };

  
  
 

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={ <h4 className='text-center' > <CircularProgress color='success' /> </h4> }
      >
        <MovieList movies={movies} select={select} handledSelect={handledSelect} genre={genre} handleGenre={handleGenre} />
      </InfiniteScroll>
    </>
  );
};

export default Movies;