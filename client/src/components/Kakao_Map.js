import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const mapDiv = styled.div`
margin: 10px
`

const MapContainer = ({ searchPlace, setCoordinate, setpostInfo, coordinate }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          //setCoordinate(data[i])
          setCoordinate({
            longitude: data[i].x,
            latitude: data[i].y
          })
          break;
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        
      });
    }
  }, [searchPlace,setCoordinate]);

    return (
        <div id='myMap' style={{
            width: "300px",
            height: "300px",
            margin: '50px'
        }}></div>
    );
}

export default MapContainer; 