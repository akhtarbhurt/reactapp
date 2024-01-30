import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import poster from "../images/no-poster.png";
import { Link } from 'react-router-dom';

export default function Similar({ id, ScrollToTop, handledClick }) {
    const [similar, setSimilar] = useState([]);

    const fetchSimilarData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`);
            const similarData = await response.json();
            setSimilar(similarData.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSimilarData();
    }, [id]);

    // Conditionally render the component based on whether there is data
    if (similar.length === 0) {
        return null; // or you can return a message or placeholder
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Wrapper>
                            <h2> Similar  </h2>
                            <Swiper
                                slidesPerView={5}
                                pagination={{
                                    type: 'progressbar',
                                }}
                                breakpoints={{
                                    '@0.00': {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    '@0.75': {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    '@1.00': {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    '@1.50': {
                                        slidesPerView: 5,
                                        spaceBetween: 20,
                                    },
                                }}
                                modules={[Pagination, Navigation]}
                                className="mySwiper mt-5 "
                            >
                                {similar.map((elem) => (
                                    <div key={elem.id}>
                                        <SwiperSlide className='text-center' onClick={handledClick} >
                                            <Link to={`/MovieDetails/${elem.id}`} reloadDocument >
                                                <img onClick={ScrollToTop}
                                                    src={elem.backdrop_path ? `https://image.tmdb.org/t/p/original/${elem.backdrop_path}` : poster}
                                                    alt="profile"
                                                    className="similar-img "
                                                    
                                                    
                                                />
                                            </Link>
                                            <h2 className='text-white fs-5 mt-3 '>{elem.original_title}</h2>
                                        </SwiperSlide>
                                    </div>
                                ))}
                            </Swiper>
                        </Wrapper>
                    </div>
                </div>
            </div>
        </>
    );
}

const Wrapper = styled.section`
    margin-top: 50px;

    .similar-img{
        height: 35vh;
    }
`;

