import React, { useEffect, useRef } from 'react';

export const KakaoMap = () => {
    const containerRef = useRef(null);
    const mapWrapperRef = useRef(null);
    const rvWrapperRef = useRef(null);
    const mapContainerRef = useRef(null);
    const rvContainerRef = useRef(null);

    useEffect(() => {
        const { kakao } = window;

        // Initialize the map
        const mapOption = {
            center: new kakao.maps.LatLng(37.563997165478966, 126.81274185608623),
            level: 3
        };
        const map = new kakao.maps.Map(mapContainerRef.current, mapOption);

        // Initialize the marker
        const placePosition = new kakao.maps.LatLng(37.563997165478966, 126.81274185608623);
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        const imageSize = new kakao.maps.Size(24, 35);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const markerPosition = new kakao.maps.LatLng(37.563997165478966, 126.81274185608623);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
        });
        marker.setMap(map);

        // Initialize the road view
        const roadview = new kakao.maps.Roadview(rvContainerRef.current);
        roadview.setPanoId(1155587712, placePosition);
        roadview.setViewpoint({
            pan: 321,
            tilt: 0,
            zoom: 0
        });

        kakao.maps.event.addListener(roadview, 'init', function () {
            const rvMarker = new kakao.maps.Marker({
                position: placePosition,
                map: roadview
            });
        });

        const infowindow = new kakao.maps.InfoWindow({
            content:
                '<div style="font-size:11px; height:70px; text-align:center; line-height:30px; width:260px; padding:8px;">' +
                '<img src="http://kssa.re.kr//static/media/kssa_logo.687e150551b6fee41a1b.png" style="width:65%" alt="Korea Security Specialist Academy" title="Korea Security Specialist Academy"><br>' +
                '<strong>서울시 강서구 방화대로 21길 72 범천빌딩 4층</strong></div>',
            pixelOffset: new kakao.maps.Point(20, -40)
        });
        infowindow.open(map, marker);
    }, []);

    const toggleMap = (active) => {
        if (active) {
            containerRef.current.className = 'view_map';
        } else {
            containerRef.current.className = 'view_roadview';
        }
    };

    return (
        <div>
            <style>
                {`
          #container {overflow:hidden;height:400px;position:relative;}
          #btnRoadview,  #btnMap {position:absolute;top:5px;left:5px;padding:7px 12px;font-size:14px;border: 1px solid #dbdbdb;background-color: #fff;border-radius: 2px;box-shadow: 0 1px 1px rgba(0,0,0,.04);z-index:1;cursor:pointer; }
          #btnRoadview:hover,  #btnMap:hover{background-color: #fcfcfc;border: 1px solid #c1c1c1;}
          #container.view_map #mapWrapper {z-index: 10;}
          #container.view_map #btnMap {display: none;}
          #container.view_roadview #mapWrapper {z-index: 0;}
          #container.view_roadview #btnRoadview {display: none;}
        `}
            </style>
            <div ref={containerRef} id="container" className="view_map" style={{ width: '100%' }}>
                <div ref={mapWrapperRef} id="mapWrapper" style={{ width: '100%', height: '400px', position: 'relative' }}>
                    <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '100%' }}></div>
                    <input type="button" id="btnRoadview" onClick={() => toggleMap(false)} title="로드뷰 보기" value="로드뷰" />
                </div>
                <div ref={rvWrapperRef} id="rvWrapper" style={{ width: '100%', height: '400px', position: 'absolute', top: 0, left: 0 }}>
                    <div ref={rvContainerRef} id="roadview" style={{ height: '100%' }}></div>
                    <input type="button" id="btnMap" onClick={() => toggleMap(true)} title="지도 보기" value="지도" />
                </div>
            </div>
        </div>
    );
};
