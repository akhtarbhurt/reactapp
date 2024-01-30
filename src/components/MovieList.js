import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SidebarMenu from '../utils/SidebarMenu';
import poster from "../images/no-poster.png"
import { Link } from 'react-router-dom';
export default function MovieList({ movies, select, handledSelect, genre, handleGenre }) {

  return (
    <Wrapper>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3  ">
            <SidebarMenu  genre={genre} handleGenre={handleGenre}  />
          </div>

          <div className="col-lg-9 col-md-12 ">
            <div className="movie-content">
              <h2> Movies </h2>

              <select
                name="popularity"
                id=""
                className='p-3 fs-5'
                onChange={handledSelect}
                value={select}
              >
                <option value="" disabled hidden>
                  Sort by
                </option>
                <option value="popularity.desc" className='fs-6 mt-2 p-3'>
                  Popular Movies
                </option>
                <option value="vote_count.desc" className='fs-6 mt-3 p-3'>
                  High Rating
                </option>
                
              </select>
            </div>
            <hr className='divider mt-4' />
            <div className="row">
              {movies &&
                movies.map((elem) => (
                  <div key={elem?.id} className="col-lg-3 col-md-3 col-sm-6 mb-4">
                    <div className="Card">
                      <Link to={`/MovieDetails/${elem.id}`} >
                      <img
                        src={elem.backdrop_path ? `https://image.tmdb.org/t/p/original/${elem.backdrop_path}` : poster}
                        alt=""
                        className='rounded'
                      />
                      </Link>
                      <h2 className='fs-5 mt-3 text-center '>{elem.title || elem.original_name }</h2>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}



const Wrapper = styled.section`
  img {
    width: 100%;
    height: 30vh;
    object-fit: cover;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: white;
    z-index: 2;
  }

  .movie-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  

  select{
    outline: none;
    width: 200px;
    background: rgba(0,0,0.90);
    color: white;
  }

  
`;
