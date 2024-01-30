import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styled from "styled-components";

// ... (other imports)

export default function VideoPopUp({ videoId, showVideoPopup, setShowVideoPopup, type }) {
    const [videoKey, setVideoKey] = useState([]);

    const fetchDataFromVideoID = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/${type}/${videoId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
            const result = await response.json();
            console.log("Video API Result:", result);
            setVideoKey(result.results);
        } catch (error) {
            console.log(error);
        }
    };

    const handledEvent = () => {
        setShowVideoPopup(!showVideoPopup);
    };

    const filterVideoID = videoKey && videoKey.filter((elem, index) => elem.type === "Trailer");

    useEffect(() => {
        fetchDataFromVideoID();
    }, [fetchDataFromVideoID]);

    return (
        <Wrapper>
            <div className="video-popup">
                <CloseOutlinedIcon className="icon" />
                <span onClick={handledEvent}> <CloseOutlinedIcon className="icon" /> </span>
                {filterVideoID && filterVideoID.length > 0 && (
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${filterVideoID[0].key}`}
                        controls
                        width="60%"
                        height="60%"
                        playing={true}
                    />
                )}
            </div>
        </Wrapper>
    );
}




const Wrapper = styled.section`
.video-popup{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    background-color:  rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    font-size: 22px;
    color: white;
    flex-direction: column;
    left: 0;
}

.icon{
    position: fixed;
    top: 5%;
    right: 5%;
    /* font-size: 20%; */
    cursor: pointer;
}

`