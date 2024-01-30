import styled from '@emotion/styled'
import CastIcon from '@mui/icons-material/Cast';
import React, { useEffect, useState } from 'react'
import { Button, Chip, Skeleton, } from '@mui/material';
import VideoPopUp from '../utils/VideoPopUp';

const HeroSection = () => {
    const [api, setApi] = useState(null); // this hook is used for fetch data from api
    const [state, setState] = useState(); // this hook is used for tab section
    const [numImagesToShow, setNumImagesToShow] = useState(5); // this hook is for responsiveness
    const [showVideoPopup, setShowVideoPopup] = useState(false) // this hook is used to show pop up

    //fetch data from api
    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`)
            const results = await response.json()
            setApi(results.results)
        } catch (error) {
            console.log(error)
        }
    }
    //toggle the api data for tab section
    const handledEvent = (index) => {
        setState(api[index]);
    };

    // for responsivness that on which screen how many images we need during breakpoints
    const handleResize = () => {
        if (window.innerWidth < 992) {
            setNumImagesToShow(3);
        } else if (window.innerWidth < 768) {
            setNumImagesToShow(2);
        } else {
            setNumImagesToShow(6);
        }
    }
    // to remove the additional cache 
    useEffect(() => {
        fetchData();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [handleResize, fetchData]);
    // to show the pop up
    const handleWatchOutClick = () => {
        setShowVideoPopup(true);
    }
    return (
        <Wrapper>
            {!api ? (
                <Skeleton variant="circular" width={100} height={100} />
            ) : (
                <div className='hero-layout' >
                    <img src={`https://image.tmdb.org/t/p/original/${state ? state.backdrop_path : api[0].backdrop_path}`} alt="hero-img" className="bg-img" />
                    <div className="hero-content">
                        <h2>{state ? state.original_title : api[0].original_title}</h2>
                        <p> {state ? state.overview.slice(0, 300) : api[0].overview}.... </p>
                        <div className='rating' >
                            <span> Release Date :  <Chip label={state ? new Date(state.release_date).toLocaleDateString() : new Date(api[0].release_date).toLocaleDateString()} color='success' /> </span>
                            <span> User Score: <Chip label={state ? state.vote_average : api[0].vote_average} color='success' />  </span>

                        </div>
                        <Button variant='contained' color='success' endIcon={<CastIcon />}
                            sx={{ padding: "10px 15px", marginTop: '20px' }} onClick={handleWatchOutClick}
                        > Watch Out </Button>
                        {showVideoPopup && <VideoPopUp videoId={`${state ? state.id : api[0].id}`} setShowVideoPopup={setShowVideoPopup} showVideoPopup={showVideoPopup} type={'movie'} />}
                    </div>
                    <div className="tab-section">
                        <h2>Today's Recommendation</h2>
                        {api.slice(1, numImagesToShow + 1).map((item, index) => (
                            <img
                                key={index}
                                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                alt="hero-img"
                                onClick={() => handledEvent(index + 1)}
                            />
                        ))}

                    </div>
                </div>
            )}
        </Wrapper>
    )
}

export default HeroSection

const Wrapper = styled.section`
    min-height: 700px;
    width: 100%;
    .bg-img {
        width: 100%;
        height: 80vh;
        opacity: 0.9;
        
        @media screen and (max-width: 385px) {
          height: 100vh;
        }
      }
      

    .hero-layout{
        position: relative;
        max-height: 1048px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        flex-direction: column;
        padding-bottom: 20px;
        
        @media screen and (max-width: 992px){
            width: 100%; 
        }
    }

    .hero-content {
        width: 40%;
        position: absolute;
        top: 8%;
        left: 2%;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 20px;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
        @media screen and (max-width: 992px) {
          font-size: 14px;
          width: 80%;
        }
        @media screen and (max-width: 768px) {
          font-size: 10px;
          width: 100%;
        }
        @media screen and (max-width: 380px) {
          top: 1%;
          width: 100%;
        }
      }
      
      .hero-content h2 {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 10px;
        @media screen and (max-width: 1245px) {
          font-size: 15px;
        }
      }
      
      .hero-content p {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 20px;
        @media screen and (max-width: 1245px) {
          font-size: 15px;
        }
      }
      
      .hero-content::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: -1;
      }
      
      
    .tab-section{
        display: flex;
        justify-content: space-evenly;
        color: white;
        margin-top: 15px;
    }
    .tab-section img{
        width: 150px;
        height: 150px;
        border-radius: 10px;
        cursor: pointer;

        @media screen and (max-width: 1000px){
           height: 100px;
           width: 100px;
        }
        
    }
    .tab-section h2{
        color: white;
        position: absolute;
        top: 70%;
    }    
`
