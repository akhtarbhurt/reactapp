import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import logo from "../images/avatar.png";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import VideoPopUp from '../utils/VideoPopUp';
import OfficialVideospop from '../utils/OfficialVideoPopUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


// ... (other imports)

// ... (other imports)

export default function OfficialVideos({ id, type }) {
    const [video, setVideo] = useState([]);
    const [image, setImage] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const fetchData = async () => {
        try {
            const [videoResponse, imageResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`),
                fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`),
            ]);

            const videoData = await videoResponse.json();
            const imageData = await imageResponse.json();

            setVideo(videoData.results);
            setImage(imageData.backdrops);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleImageClick = (selectedVideo) => {
        setSelectedVideo(selectedVideo);
    };

    const handleClosePopup = () => {
        setSelectedVideo(null);
    };

    // Filter images based on video data
    const filteredImages = image.filter((elem, index) => video[index]?.name);

    return (
        <>
            {filteredImages.length > 0 && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Wrapper>
                                <h2>Official Videos</h2>
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
                                    {filteredImages.map((elem, index) => (
                                        <SwiperSlide key={elem.file_path} className='text-center slide '  >
                                            <img key={elem.id}
                                                className='official-img'
                                                src={`https://image.tmdb.org/t/p/original/${elem.file_path}`}
                                                alt=""
                                                onClick={() => handleImageClick(video[index])}
                                            />
                                            {video[index]?.name && <h2 className='fs-6 mt-3'>{video[index].name}</h2>}
                                            <div className="play">
                                                <PlayArrowIcon className='play-icon' onClick={() => handleImageClick(video[index])} />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {selectedVideo && (
                                    <OfficialVideospop
                                        videoKey={selectedVideo.key}
                                        handleClosePopup={handleClosePopup}
                                    />
                                )}
                            </Wrapper>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const Wrapper = styled.section`
    margin-top: 50px;

    .official-img {
        cursor: pointer;
        height: 25vh;
        border-radius: 10px;
        opacity: 0.5;
    }
    .slide{
        position: relative;
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
        position: absolute;
        top: 20%;
        left: 34%;
        z-index: 10;
    }
    .play-icon{
        font-size: 50px;
        cursor: pointer;
    }
`;








