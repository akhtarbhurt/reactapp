import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styled from "styled-components";

// ... (other imports)

export default function OfficialVideospop({ videoKey, handleClosePopup }) {
    return (
        <Wrapper>
            <div className="video-popup">
                <CloseOutlinedIcon className="icon" onClick={handleClosePopup} />
                <span onClick={handleClosePopup}> <CloseOutlinedIcon className="icon" /> </span>
                {videoKey && (
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoKey}`}
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
    background-color:  rgba(0, 0, 0, 0.90);
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