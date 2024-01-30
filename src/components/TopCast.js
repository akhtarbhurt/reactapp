import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import logo from "../images/avatar.png";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';

export default function TopCast({ id, type }) {
  const [cast, setCast] = useState([]);

  const findDataByApi = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setCast(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findDataByApi();
  }, [id, type]);

 

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Wrapper>
              <h2> Top Cast </h2>
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
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper mt-5 "
              >
                {cast.map((elem) => (
                  <div key={elem.id}>
                    <SwiperSlide className='text-center'>
                      <img
                        src={elem.profile_path ? `https://image.tmdb.org/t/p/original/${elem.profile_path}` : logo}
                        alt="profile"
                        className="cast-img mt-4"
                      />
                      <h2 className='text-white fs-5 mt-3 '>{elem.original_name}</h2>
                      <h3 className='text-muted fs-6 mt-2 '>{elem.character}</h3>
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

  .cast-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: green;
    height: 2vh;
    font-size: 2px !important;
  }
`;
