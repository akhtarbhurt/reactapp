import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import TuneIcon from '@mui/icons-material/Tune';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


// ... (previous code)

export default function SidebarMenu({ genre, handleGenre }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [menu, setMenu] = useState();
  const toggleGenre = (genreId) => {
    const newSelectedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(newSelectedGenres);
    handleGenre(newSelectedGenres);
  };

  const handledMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
      <Wrapper>
        <div className="filter-icon" onClick={handledMenu} >
          <span> Filter </span>
          <TuneIcon/>
        </div>
        <div className={`side-menubar ${menu ? "active" : ""} `}>
          <div className="title">
            <h2 className="fs-4"> Categories </h2>
          </div>
          <div className="closed-icon" onClick={handledMenu} >
            <CloseOutlinedIcon/>
          </div>
          <div>
            {genre && genre.length > 0 &&
              genre.map((g) => (
                <FormGroup >

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="success"
                        className="check"
                        checked={selectedGenres.includes(g.id)}
                        onChange={() => toggleGenre(g.id)}

                      />
                    }
                    label={g.name}
                  />
                </FormGroup>
              ))}
          </div>
        </div>

      </Wrapper>

    </>
  );
}

// ... (rest of the code)


const Wrapper = styled.section`
.side-menubar{
  border: 1px solid rgba(0, 0, 0.4);
  display: flex;
  background-color: rgba(0, 0, 0.96);
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  flex-direction: column;
  z-index; 999;


  @media screen and (max-width: 992px) {
    display: none;
  }
  
}
  .check {
    color: lightgreen;
  }

  .filter-icon, .closed-icon{
    display: none;
  }

  @media screen and (max-width: 992px) {
    .filter-icon{
      display: block;
      font-size: 22px;
      position: absolute;
      top: 23%;
    }

    .closed-icon{
      display: block;
      position: absolute;
      right: 10%;
    }

    .active{
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index; 999;
    }
  }
  
`;

