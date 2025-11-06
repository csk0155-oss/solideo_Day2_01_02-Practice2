/**
 * 지도 관리 클래스
 * Kakao Map API를 사용하여 경로를 시각화합니다
 */
class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.polylines = [];
        this.geocoder = null;
        this.isKakaoMapAvailable = typeof kakao !== 'undefined' && kakao.maps;
    }

    /**
     * 지도 초기화
     */
    initMap() {
        if (!this.isKakaoMapAvailable) {
            console.warn('Kakao Map API가 로드되지 않았습니다. 실제 환경에서는 API 키가 필요합니다.');
            this.showMapPlaceholder();
            return;
        }

        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
            level: 8 // 확대 레벨
        };

        this.map = new kakao.maps.Map(container, options);
        this.geocoder = new kakao.maps.services.Geocoder();
    }

    /**
     * Kakao Map API가 없을 때 플레이스홀더 표시
     */
    showMapPlaceholder() {
        const mapContainer = document.getElementById('map');
        mapContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 20px;">
                <div style="font-size: 3em; margin-bottom: 20px;">🗺️</div>
                <h3 style="margin-bottom: 10px; font-size: 1.5em;">경로 지도 미리보기</h3>
                <p style="opacity: 0.9; line-height: 1.6;">
                    출발지: <span id="mapPlaceholderDeparture">-</span><br>
                    도착지: <span id="mapPlaceholderDestination">-</span><br>
                    교통수단: <span id="mapPlaceholderTransport">-</span>
                </p>
                <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.8;">
                    실제 환경에서는 Kakao Map API 키가 필요합니다.<br>
                    API 키는 HTML의 script 태그에서 설정할 수 있습니다.
                </p>
            </div>
        `;
    }

    /**
     * 플레이스홀더 업데이트
     */
    updatePlaceholder(departure, destination, transportType) {
        const transportNames = {
            'car': '자동차 🚗',
            'public': '대중교통 🚇',
            'flight': '비행기 ✈️',
            'all': '전체 비교'
        };

        const depEl = document.getElementById('mapPlaceholderDeparture');
        const destEl = document.getElementById('mapPlaceholderDestination');
        const transEl = document.getElementById('mapPlaceholderTransport');

        if (depEl) depEl.textContent = departure;
        if (destEl) destEl.textContent = destination;
        if (transEl) transEl.textContent = transportNames[transportType] || transportType;
    }

    /**
     * 지도 표시
     */
    showMap() {
        const mapSection = document.getElementById('mapSection');
        mapSection.classList.remove('hidden');
    }

    /**
     * 지도 숨김
     */
    hideMap() {
        const mapSection = document.getElementById('mapSection');
        mapSection.classList.add('hidden');
    }

    /**
     * 기존 마커와 폴리라인 제거
     */
    clearMap() {
        // 마커 제거
        this.markers.forEach(marker => {
            if (marker.setMap) marker.setMap(null);
        });
        this.markers = [];

        // 폴리라인 제거
        this.polylines.forEach(polyline => {
            if (polyline.setMap) polyline.setMap(null);
        });
        this.polylines = [];
    }

    /**
     * 주소를 좌표로 변환
     */
    geocodeAddress(address) {
        return new Promise((resolve, reject) => {
            if (!this.isKakaoMapAvailable || !this.geocoder) {
                // 시뮬레이션 좌표 반환
                resolve(this.getSimulatedCoordinates(address));
                return;
            }

            this.geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    resolve({
                        lat: parseFloat(result[0].y),
                        lng: parseFloat(result[0].x)
                    });
                } else {
                    // 주소 검색 실패 시 시뮬레이션 좌표 반환
                    resolve(this.getSimulatedCoordinates(address));
                }
            });
        });
    }

    /**
     * 시뮬레이션 좌표 생성
     */
    getSimulatedCoordinates(address) {
        // 주요 도시 및 장소의 대략적인 좌표
        const locations = {
            '서울': { lat: 37.5665, lng: 126.9780 },
            '서울역': { lat: 37.5547, lng: 126.9707 },
            '강남': { lat: 37.4979, lng: 127.0276 },
            '강남역': { lat: 37.4979, lng: 127.0276 },
            '인천': { lat: 37.4563, lng: 126.7052 },
            '인천국제공항': { lat: 37.4602, lng: 126.4407 },
            '부산': { lat: 35.1796, lng: 129.0756 },
            '부산역': { lat: 35.1151, lng: 129.0420 },
            '해운대': { lat: 35.1587, lng: 129.1604 },
            '제주': { lat: 33.4996, lng: 126.5312 },
            '제주공항': { lat: 33.5067, lng: 126.4931 },
            '대구': { lat: 35.8714, lng: 128.6014 },
            '대전': { lat: 36.3504, lng: 127.3845 },
            '광주': { lat: 35.1595, lng: 126.8526 },
            '도쿄': { lat: 35.6762, lng: 139.6503 },
            '오사카': { lat: 34.6937, lng: 135.5023 },
            '방콕': { lat: 13.7563, lng: 100.5018 },
            '뉴욕': { lat: 40.7128, lng: -74.0060 }
        };

        // 주소에서 도시명 추출
        for (const [city, coords] of Object.entries(locations)) {
            if (address.includes(city)) {
                return coords;
            }
        }

        // 기본 좌표 (서울)
        return { lat: 37.5665, lng: 126.9780 };
    }

    /**
     * 경로 표시
     */
    async displayRoute(departure, destination, transportType = 'car') {
        this.showMap();
        this.clearMap();

        // 플레이스홀더 업데이트
        if (!this.isKakaoMapAvailable) {
            this.updatePlaceholder(departure, destination, transportType);
            return;
        }

        if (!this.map) {
            this.initMap();
        }

        try {
            // 출발지와 도착지 좌표 가져오기
            const depCoords = await this.geocodeAddress(departure);
            const destCoords = await this.geocodeAddress(destination);

            // 마커 생성
            this.createMarker(depCoords, '출발', 'start');
            this.createMarker(destCoords, '도착', 'end');

            // 경로선 그리기
            this.drawRoute(depCoords, destCoords, transportType);

            // 지도 범위 조정
            this.fitBounds(depCoords, destCoords);
        } catch (error) {
            console.error('경로 표시 중 오류:', error);
        }
    }

    /**
     * 마커 생성
     */
    createMarker(position, title, type) {
        if (!this.isKakaoMapAvailable || !this.map) return;

        const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);

        // 마커 이미지 설정
        const imageSrc = type === 'start'
            ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png'
            : 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png';
        const imageSize = new kakao.maps.Size(50, 45);
        const imageOption = { offset: new kakao.maps.Point(15, 43) };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
            title: title
        });

        marker.setMap(this.map);
        this.markers.push(marker);

        // 인포윈도우 추가
        const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${title}</div>`
        });

        kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(this.map, marker);
        });

        kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
        });
    }

    /**
     * 경로선 그리기
     */
    drawRoute(startCoords, endCoords, transportType) {
        if (!this.isKakaoMapAvailable || !this.map) return;

        // 교통수단에 따른 선 색상
        const colors = {
            'car': '#4A90E2',      // 파란색
            'public': '#50C878',   // 초록색
            'flight': '#E74C3C',   // 빨간색
            'all': '#F39C12'       // 주황색
        };

        const linePath = [
            new kakao.maps.LatLng(startCoords.lat, startCoords.lng),
            new kakao.maps.LatLng(endCoords.lat, endCoords.lng)
        ];

        const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: colors[transportType] || colors['car'],
            strokeOpacity: 0.7,
            strokeStyle: 'solid'
        });

        polyline.setMap(this.map);
        this.polylines.push(polyline);
    }

    /**
     * 지도 범위 조정
     */
    fitBounds(startCoords, endCoords) {
        if (!this.isKakaoMapAvailable || !this.map) return;

        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(startCoords.lat, startCoords.lng));
        bounds.extend(new kakao.maps.LatLng(endCoords.lat, endCoords.lng));

        this.map.setBounds(bounds);

        // 약간의 패딩 추가
        setTimeout(() => {
            const level = this.map.getLevel();
            this.map.setLevel(level + 1);
        }, 100);
    }

    /**
     * 대중교통 경로 표시 (다중 경유지)
     */
    async displayPublicTransitRoute(departure, destination, steps) {
        if (!this.isKakaoMapAvailable || !this.map) {
            this.updatePlaceholder(departure, destination, 'public');
            return;
        }

        this.showMap();
        this.clearMap();

        if (!this.map) {
            this.initMap();
        }

        try {
            const depCoords = await this.geocodeAddress(departure);
            const destCoords = await this.geocodeAddress(destination);

            this.createMarker(depCoords, '출발', 'start');
            this.createMarker(destCoords, '도착', 'end');

            // 경유지가 있으면 표시
            if (steps && steps.length > 0) {
                const allCoords = [depCoords];

                for (const step of steps) {
                    if (step.location) {
                        const stepCoords = await this.geocodeAddress(step.location);
                        allCoords.push(stepCoords);
                    }
                }

                allCoords.push(destCoords);
                this.drawMultiPointRoute(allCoords, 'public');
            } else {
                this.drawRoute(depCoords, destCoords, 'public');
            }

            this.fitBounds(depCoords, destCoords);
        } catch (error) {
            console.error('대중교통 경로 표시 중 오류:', error);
        }
    }

    /**
     * 다중 경유지 경로선 그리기
     */
    drawMultiPointRoute(coords, transportType) {
        if (!this.isKakaoMapAvailable || !this.map) return;

        const colors = {
            'car': '#4A90E2',
            'public': '#50C878',
            'flight': '#E74C3C',
            'all': '#F39C12'
        };

        const linePath = coords.map(coord =>
            new kakao.maps.LatLng(coord.lat, coord.lng)
        );

        const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: colors[transportType] || colors['public'],
            strokeOpacity: 0.7,
            strokeStyle: 'solid'
        });

        polyline.setMap(this.map);
        this.polylines.push(polyline);
    }
}

// 전역 인스턴스 생성
const mapManager = new MapManager();
