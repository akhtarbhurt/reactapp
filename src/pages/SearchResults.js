import React from 'react';
import { useGlobalContext } from '../store/store';
import poster from "../images/no-poster.png"
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchResults = () => {
  const { resultFilter, setResult, value } = useGlobalContext();

  const fetchMoreData = async () => {
    // Implement your logic to fetch more data here, for example, fetching the next page
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(value)}&page=2&api_key=${process.env.REACT_APP_API_KEY}`
    );

    const newData = await response.json();
    setResult((prevResult) => [...prevResult, ...newData.results]);
  };

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={resultFilter.length}
        next={fetchMoreData}
        hasMore={true} // You should implement a condition to determine if there's more data
        loader={<h4>Loading...</h4>}
      >
        <div className='container'>
          <h2 className='mt-3' >Search Results</h2>
          <div className="row">
            {resultFilter.map((elem) => (
              <div key={elem.id} className="col-md-3 mt-4 text-center  ">
                <div className="card-container">
                  <Link to={`${elem.media_type === "movie" ? `/MovieDetails/${elem.id}` : `/TvDetails/${elem.id}`}`} >
                    <img
                      src={elem.backdrop_path ? `https://image.tmdb.org/t/p/original/${elem.backdrop_path}` : poster}
                      alt=""
                    />
                  </Link>
                  <h2 className='fs-5 mt-3' > {elem.original_title || elem.original_name} </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </Wrapper>
  );
}

export default SearchResults;

const Wrapper = styled.section`
  img {
    height: 40vh;
    width: 100%;
  }
`;
