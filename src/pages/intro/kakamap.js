import React, { useEffect } from 'react';

const KakaoMap = () => {
    useEffect(() => {
        // Create a map instance
        const container = document.getElementById('kakao-map');
        const options = {
            center: new window.kakao.maps.LatLng(37.568477, 126.81337), // Coordinates for 서울시 강서구 방화대로 21길 72 범천빌딩 4층
            level: 3 // Zoom level (0-14)
        };
        const map = new window.kakao.maps.Map(container, options);

        // Create a marker
        const markerPosition = new window.kakao.maps.LatLng(37.568477, 126.81337);
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });

        // Add the marker to the map
        marker.setMap(map);
    }, []);

    return <div id="kakao-map" style={{ width: '100%', height: '400px' }} />;
};

export default KakaoMap;
