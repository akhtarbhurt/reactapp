import React, { useState } from 'react'
import styled from 'styled-components'
export default function Slide({ slide, handleClick, setTimeFrame, title }) {
    return (
        <Wrapper>
            <h2>{title}</h2>
            <div className="container2">
                <div
                    className={`day ${slide ? "day" : "active"}`}
                    onClick={() => {
                        if (slide) {
                            handleClick("day");
                            setTimeFrame("day");
                        }
                    }}
                >
                    <span>day</span>
                </div>
                <div
                    className={`week ${!slide ? "week" : "active"}`}
                    onClick={() => {
                        if (!slide) {
                            handleClick("week");
                            setTimeFrame("week");
                        }
                    }}
                >
                    <span>week</span>
                </div>
            </div>
        </Wrapper>
    );
}


const Wrapper = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media screen and (max-width: 350px){
        justify-content: space-between;
    }
   
    h2{
        font-size: 22px;
        font-weight: 600;

        @media screen and (max-width: 992px){
            font-size: 14px;
        }
        @media screen and (max-width: 350px){
            font-size: 14px;
            padding-left: 10px;
        }
    }

    .container2 {
        width: 200px;
        display: flex;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-radius: 20px;
        overflow: hidden;
    }
      
      .container2 .day, .container2 .week {
        flex-grow: 1;
        height: 62px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.2s linear;
        text-transform: capitalize;
        font-weight: 400;
        font-size: 18px;
        background: white;
        color: black;
        

        @media screen and (max-width: 992px){
            font-size: 12px;
            height: 42px;
        }
        @media screen and (max-width: 340px){
            font-size: 12px;
            height: 62px;
        }
      }

    .day.active {
        background-color: green;
        color: white;
    }

    .week.active {
        background-color: green;
        color: white;
    }
      
`

