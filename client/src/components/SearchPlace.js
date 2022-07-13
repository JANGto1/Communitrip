import React, { useState } from "react";
import MapContainer from "./Kakao_Map";

const SearchPlace = ({setCoordinate, setpostInfo, coordinate, postInfo}) => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
    
  };

  const handlecoordinate =() => {
    const longitude = coordinate.x;
    const latitude = coordinate.y;
    setCoordinate((e) => {
      return {...e, 
        longitude: longitude, 
        latitude: latitude }
    })
    
  }

  return (
    <>
      <MapContainer searchPlace={place} setCoordinate={setCoordinate} setpostInfo={setpostInfo} coordinate={coordinate} />
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="여행지역을 검색해주세요"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit" onClick={handlecoordinate}>검색</button>
      </form>
      
    </>
  );
};

export default SearchPlace;