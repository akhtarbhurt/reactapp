import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import styled from '@emotion/styled';
import Slide from '../utils/Slide';
import CircleRating from '../utils/CircleRating';
import { Skeleton } from '@mui/material';
import { Link} from 'react-router-dom';


export default function MovieSlider({  }) {
    const [data, fetchData] = useState([]);
    const [slide, setSlide] = useState(false);
    const [timeFrame, setTimeFrame] = useState("day");
    const [showSkeleton, setShowSkeleton] = useState(true); // Added state for skeleton visibility


    const handleClick = (newTimeFrame) => {
        setTimeFrame(newTimeFrame);
        setSlide(!slide);
    }
   
    const getDataFromApi = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/${timeFrame}?api_key=${process.env.REACT_APP_API_KEY}`);
            const result = await response.json();
            fetchData(result.results);
            setTimeout(() => {
                setShowSkeleton(false); // Hide skeleton after 1 second
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataFromApi();
    }, [timeFrame]);

    return (
        <>
            <Wrapper>
                <Slide slide={slide} handleClick={handleClick} setTimeFrame={setTimeFrame} title={"Popular Movies"} />

                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    loop={true}
                    navigation={true}
                    centeredSlides={true}

                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
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
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                >
                    {data.map((elem) => {
                        return <div key={elem.id}>

                            <SwiperSlide>
                                <div className=" container   slide-container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {showSkeleton && ( // Show skeleton if showSkeleton is true
                                                <Skeleton
                                                    variant="rect"
                                                    animation="wave"
                                                    height={300}
                                                    width="100%"
                                                    style={{ marginBottom: 6 }}
                                                />
                                            )}
                                            {!showSkeleton && ( // Show content if showSkeleton is false
                                                <>
                                                    <Link to={`/MovieDetails/${elem.id}`} >
                                                        <img src={`https://image.tmdb.org/t/p/original/${elem.backdrop_path}`} alt="popular image" className='popular-img'  />
                                                        <div className="circle-rating-container">
                                                            <CircleRating rating={`${elem.vote_average.toFixed(1)}`} />
                                                        </div>
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="slide-content">
                                    <h3> {elem.title ? elem.title : elem.name} </h3>
                                </div>
                            </SwiperSlide  >
                        </div>
                    })}
                </Swiper>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
    position: relative;
    margin-top: 50px;
    font-weight: bold;
    width: 100%;
    color: white;
    .mySwiper {
        margin: 50px auto;
        max-width: 1200px;
        width: 100%;
        padding: 0 20px;

    }


    .popular-img{
        height: 40vh;
        border-radius: 5px;
        cursor: pointer;
    }
   

    .slide-container {
        position: relative;
    }
    
    .circle-rating-container {
        position: absolute;
        top: 95%;
        left: 35%;
        transform: translate(-50%, -50%);
        width: 55%;
        color: white; /* Set text color to white */
        text-shadow: 4px 8px 8px rgba(0,0,0.5);
        background-color: white;
        border-radius: 50%;

        @media screen and (max-width: 478 ){
            width: 10%;
        }
    }
    

    h3{
        font-size: 15px;
        margin-top: 35px;
        font-weight: 600;
    }

    .swiper-button-next, .swiper-button-prev{
        color: green;
        top: 40%;
    }
`