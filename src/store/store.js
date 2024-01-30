import React, { useContext, useEffect, useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [value, setValue] = useState(''); 
  const [result, setResult] = useState([]);
  
  const handledInput = (e) => {
    if (e.key === "Enter" ) {
      setValue(e.target.value);
    }
  };

  const fetchDataResult = async () => {
    // Use encodeURIComponent to handle special characters in the search query
    const encodedValue = encodeURIComponent(value);

    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodedValue}&page=1&api_key=${process.env.REACT_APP_API_KEY}`
    );

    const result = await response.json();
    setResult(result.results);

    
  };

  const resultFilter = result.filter((elem)=>  elem.media_type !== "person" )


  useEffect(() => {
    fetchDataResult();
  }, [value]); 

  return (
    <AppContext.Provider value={{ handledInput, resultFilter, value, setResult }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
