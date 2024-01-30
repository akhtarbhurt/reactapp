import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VideoPopUp from '../utils/VideoPopUp';
import CircleRating from '../utils/CircleRating';
import TopCast from '../components/TopCast';
import OfficialVideos from '../components/OfficialVideos';
import poster from "../images/no-poster.png"
import TvSimilar from '../components/TvSimilar';
import TvRecommendation from '../components/TvRecommendation';
import Skeleton from 'react-loading-skeleton';

export default function TvDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [showVideoPopup, setShowVideoPopup] = useState();
    const [crew, setCrew] = useState([]);
    const [showSkeleton, setSkeleton] = useState(true);

    const handleWatchOutClick = () => {
        setShowVideoPopup(true);
    }

    const fetchDataID = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
            const data = await response.json();
            setDetails(data);
        } catch (error) {
            console.log(error);
        }
    };

    const findDataByApi = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
            const data = await response.json();
            setCrew(data.crew);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
            fetchDataID();
            findDataByApi();
            setSkeleton(false)
    }, [id]);
    const directors = crew.filter((elem) => elem.job === "Executive Producer");
    const writer = crew.filter((elem) => elem.known_for_department === "Writing");

    if (!details) {
        return (
            null
        );
    }
    

        return (
            <>
                <Wrapper>
                    <div className="container">
                        <div className="row align-items-stretch">
                            <div className=" col-lg-5 col-md-12">
                               {
                                showSkeleton ? ( <Skeleton height={500} />
                                ) : (<img   src={details.backdrop_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}` : poster} className='main-bg' alt="" />)
                               }
                            
                            </div>
                            <div className=" col-lg-5 col-md-12">
                                <h2 className='mt-2' > {`${!details?.original_title ? details.name : details.original_title}`} </h2>
                                <span className='tagline text-muted ' > {details.tagline} </span>
                                <div className="icons">
                                    <div className="rating">
                                        <CircleRating rating={`${details?.vote_average.toFixed(1)}`} />
                                    </div>
                                    <div className="play">
                                        <PlayArrowIcon className='play-icon' onClick={handleWatchOutClick} />
                                        {showVideoPopup && <VideoPopUp videoId={`${details.id}`} setShowVideoPopup={setShowVideoPopup} showVideoPopup={showVideoPopup} type={'tv'} />}
                                    </div>
                                </div>
                                <h3 className='mt-3 fs-1 fw-bold ' >Overview</h3>
                                <p className='mt-1 fs-6' > { details.overview ? details.overview : "N/A" } </p>
                                <div className="content">
                                    <p className='text-muted fs-6 mt-3' > Created By : <span className=' text-white  ' >{directors.length > 0 ? directors[0].name : 'N/A'} </span> </p>
                                    <hr className='divider' />
                                    <p className='text-muted fs-6 mt-3' > Writer : <span className=' text-white  ' >{writer.length > 0 ? writer[0].name : 'N/A'} </span> </p>
                                    <hr className='divider' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <TopCast id={id} type={'tv'} />
                    <OfficialVideos id={id} type={'tv'} />
                    <TvSimilar id={id}   />
                    <TvRecommendation id={id}  />
                </Wrapper>
            </>
        );
    }

const Wrapper = styled.section`
    margin-top: 50px;
    color: white;

    .main-bg{
        width: 90%;
        height: 600px;
        border-radius: 10px;
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
`;

   