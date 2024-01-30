import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VideoPopUp from '../utils/VideoPopUp';
import CircleRating from '../utils/CircleRating';
import TopCast from '../components/TopCast';
import OfficialVideos from '../components/OfficialVideos';
import Similar from '../components/Similar';
import poster from "../images/no-poster.png"
import Recommendation from '../components/Recommendation';



export default function MovieDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [showVideoPopup, setShowVideoPopup] = useState(false) // this hook is used to show pop up
    const [crew, setCrew] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleWatchOutClick = () => {
        setShowVideoPopup(true);
    }

   

    const fetchData = async () => {
        try {
            const [detailsResponse, creditsResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`),
                fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
            ]);

            const [detailsData, creditsData] = await Promise.all([
                detailsResponse.json(),
                creditsResponse.json()
            ]);

            setDetails(detailsData);
            setCrew(creditsData.crew);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [id]);



    const directors = crew.filter((elem) => elem?.job === "Director");
    const writer = crew.filter((elem) => elem?.known_for_department === "Writing");


    if (!details) {
        return <div>Loading...</div>;
    }

    const handledClick = ()=>{
        setInterval(() => {
            setLoading(true)
        },1000 );
    }
    console.log(loading)
    return (
        <>
            <Wrapper>
                <div className="container">

                    <div className="row align-items-stretch">
                        <div className=" col-lg-5 col-md-12">
                            <img   src={details.backdrop_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}` : poster} className={`main-bg`} alt="" />
                        </div>
                        <div className=" col-lg-5 col-md-12">
                            <h2 className='mt-2' > {details.original_title} </h2>
                            <span className='tagline text-muted ' > {details.tagline} </span>
                            <div className="icons">
                                <div className="rating">
                                    <CircleRating rating={`${details?.vote_average.toFixed(1)}`} />
                                </div>
                                <div className="play">
                                    <PlayArrowIcon className='play-icon' onClick={handleWatchOutClick} />
                                    {showVideoPopup && <VideoPopUp videoId={`${details.id}`} setShowVideoPopup={setShowVideoPopup} showVideoPopup={showVideoPopup} type={'movie'} />}
                                </div>
                            </div>
                            <h3 className='mt-3 fs-1 fw-bold ' >Overview</h3>
                            <p className='mt-1 fs-6' > {details.overview} </p>
                            <div className="content">
                                <div className="content-2 mt-5 ">
                                    <p className=' text-muted fs-6 ' > 
                                        Status: <span className=' text-white   ' > {details.status}</span>
                                    </p>
                                    <p className=' text-muted fs-6 ' > 
                                        Released Date: <span className=' text-white   '> {details.release_date}</span>  
                                    </p>
                                    <p className=' text-muted fs-6  ' > 
                                        Runtime: <span className=' text-white  ' >{details.runtime} mins </span>  
                                    </p>
                                </div>
                                <hr className='divider' />
                                <p className='text-muted fs-6 mt-3' > Director : <span className=' text-white  ' >{directors?.length > 0 ? directors[0]?.name : 'N/A'} </span> </p>
                                <hr className='divider' />
                                <p className='text-muted fs-6 mt-3' > Writer : <span className=' text-white  ' >{writer?.length > 0 ? writer[0]?.name : 'N/A'} </span> </p>
                            </div>
                        </div>
                    </div>
                </div>
                <TopCast id={id} type={'movie'} />
                <OfficialVideos id={id} type={'movie'} />
                <Similar id={id}  handledClick={handledClick}  />
                <Recommendation id={id}   />
                
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
    /* Add your styles here */
    margin-top: 50px;
    color: white;
   
    .main-bg{
        width: 90%;
        height: 600px;
        border-radius: 10px;
    }
    .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2); /* Adjust the opacity value as needed */
        z-index: 2; /* Ensure the overlay is on top of the background image */
    }
    
    .icons{
        display: flex;
        gap: 20px;
        align-items: center;
    }
    .rating{
        width:90px;
        background: white;
        color: white;
        border-radius: 50%;
        margin-top: 20px;
        font-size: 25px;
    }
    .play{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .play-icon{
        font-size: 50px;
        cursor: pointer;
    }
    .divider{
        width: 100%;
        height: 1px;
        background: white;
    }
    .active{
        display: none;
    }
    .content-2{
        display: flex;
        gap: 20px;

        @media screen and (max-width: 992px){
            flex-direction: column
        }
    }
`;
