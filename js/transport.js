// 교통수단 데이터 및 검색 기능

// 대중교통 노선 데이터 (시뮬레이션)
const publicTransportData = {
    '서울역-부산역': {
        routes: [
            {
                type: 'express',
                steps: [
                    { icon: '🚄', type: 'train', name: 'KTX', from: '서울역', to: '부산역', duration: 158, detail: '직통' }
                ],
                totalTime: 158,
                fare: 59800,
                transfers: 0,
                firstTrain: '05:00',
                lastTrain: '23:00'
            },
            {
                type: 'economy',
                steps: [
                    { icon: '🚆', type: 'train', name: 'ITX-새마을', from: '서울역', to: '부산역', duration: 250, detail: '일반석' }
                ],
                totalTime: 250,
                fare: 42900,
                transfers: 0,
                firstTrain: '06:30',
                lastTrain: '21:00'
            }
        ]
    },
    '강남역-부산역': {
        routes: [
            {
                type: 'best',
                steps: [
                    { icon: '🚇', type: 'subway', name: '신분당선', from: '강남역', to: '양재역', duration: 7, detail: '1정거장' },
                    { icon: '🚶', type: 'walk', name: '도보', from: '양재역', to: '서울고속버스터미널', duration: 8, detail: '500m' },
                    { icon: '🚌', type: 'bus', name: '고속버스', from: '서울고속버스터미널', to: '부산종합버스터미널', duration: 240, detail: '직통' },
                    { icon: '🚌', type: 'bus', name: '시내버스', from: '부산종합버스터미널', to: '부산역', duration: 25, detail: '10번 버스' }
                ],
                totalTime: 280,
                fare: 35400,
                transfers: 3,
                firstTrain: '05:30',
                lastTrain: '23:30'
            }
        ]
    },
    '인천국제공항-서울역': {
        routes: [
            {
                type: 'best',
                steps: [
                    { icon: '🚄', type: 'train', name: '공항철도 직통열차', from: '인천국제공항', to: '서울역', duration: 43, detail: '직통' }
                ],
                totalTime: 43,
                fare: 9000,
                transfers: 0,
                firstTrain: '05:20',
                lastTrain: '22:40'
            },
            {
                type: 'economy',
                steps: [
                    { icon: '🚇', type: 'subway', name: '공항철도 일반', from: '인천국제공항', to: '서울역', duration: 59, detail: '완행' }
                ],
                totalTime: 59,
                fare: 4750,
                transfers: 0,
                firstTrain: '05:00',
                lastTrain: '23:30'
            }
        ]
    }
};

// 항공편 데이터 (시뮬레이션)
const flightData = {
    '국내': {
        '서울-제주': {
            airport: { departure: '김포국제공항', arrival: '제주국제공항' },
            distance: 450,
            duration: 60,
            flights: [
                { airline: '대한항공', flightNo: 'KE1234', time: '07:00 → 08:00', class: '이코노미', price: 89000, stopover: '직항', bestDeal: false },
                { airline: '아시아나항공', flightNo: 'OZ5678', time: '09:30 → 10:30', class: '이코노미', price: 75000, stopover: '직항', bestDeal: true },
                { airline: '제주항공', flightNo: '7C2345', time: '12:00 → 13:00', class: '이코노미', price: 55000, stopover: '직항', bestDeal: false },
                { airline: '진에어', flightNo: 'LJ4567', time: '15:30 → 16:30', class: '이코노미', price: 58000, stopover: '직항', bestDeal: false },
                { airline: '티웨이항공', flightNo: 'TW7890', time: '19:00 → 20:00', class: '이코노미', price: 52000, stopover: '직항', bestDeal: false }
            ]
        },
        '서울-부산': {
            airport: { departure: '김포국제공항', arrival: '김해국제공항' },
            distance: 325,
            duration: 55,
            flights: [
                { airline: '대한항공', flightNo: 'KE1101', time: '06:50 → 07:50', class: '이코노미', price: 68000, stopover: '직항', bestDeal: false },
                { airline: '아시아나항공', flightNo: 'OZ6611', time: '10:30 → 11:25', class: '이코노미', price: 62000, stopover: '직항', bestDeal: true },
                { airline: '에어부산', flightNo: 'BX8201', time: '14:00 → 14:55', class: '이코노미', price: 45000, stopover: '직항', bestDeal: false }
            ]
        }
    },
    '해외': {
        '서울-도쿄': {
            airport: { departure: '인천국제공항', arrival: '나리타국제공항' },
            distance: 1160,
            duration: 140,
            flights: [
                { airline: '대한항공', flightNo: 'KE2701', time: '08:30 → 10:50', class: '이코노미', price: 450000, stopover: '직항', bestDeal: false },
                { airline: 'ANA', flightNo: 'NH1251', time: '11:00 → 13:20', class: '이코노미', price: 380000, stopover: '직항', bestDeal: true },
                { airline: '제주항공', flightNo: '7C1101', time: '15:40 → 18:00', class: '이코노미', price: 280000, stopover: '직항', bestDeal: false },
                { airline: '아시아나항공', flightNo: 'OZ1071', time: '19:30 → 21:50', class: '이코노미', price: 420000, stopover: '직항', bestDeal: false }
            ]
        },
        '서울-오사카': {
            airport: { departure: '인천국제공항', arrival: '간사이국제공항' },
            distance: 890,
            duration: 110,
            flights: [
                { airline: '대한항공', flightNo: 'KE2721', time: '09:00 → 10:50', class: '이코노미', price: 380000, stopover: '직항', bestDeal: false },
                { airline: '티웨이항공', flightNo: 'TW272', time: '13:20 → 15:10', class: '이코노미', price: 220000, stopover: '직항', bestDeal: true },
                { airline: '제주항공', flightNo: '7C1301', time: '17:30 → 19:20', class: '이코노미', price: 250000, stopover: '직항', bestDeal: false }
            ]
        },
        '서울-방콕': {
            airport: { departure: '인천국제공항', arrival: '수완나품국제공항' },
            distance: 3580,
            duration: 340,
            flights: [
                { airline: '대한항공', flightNo: 'KE651', time: '10:50 → 15:30', class: '이코노미', price: 680000, stopover: '직항', bestDeal: false },
                { airline: '타이항공', flightNo: 'TG659', time: '14:20 → 19:00', class: '이코노미', price: 550000, stopover: '직항', bestDeal: true },
                { airline: '진에어', flightNo: 'LJ001', time: '18:30 → 23:10', class: '이코노미', price: 420000, stopover: '직항', bestDeal: false }
            ]
        }
    }
};

// 국내/해외 구분 함수
function isInternational(departure, destination) {
    const internationalKeywords = ['도쿄', '오사카', '후쿠오카', '삿포로', '방콕', '싱가포르', '홍콩',
                                   '베이징', '상하이', '타이베이', '괌', '사이판', '파리', '런던',
                                   '뉴욕', 'Tokyo', 'Osaka', 'Bangkok', 'Singapore', 'Hong Kong'];

    const combinedText = `${departure} ${destination}`.toLowerCase();

    return internationalKeywords.some(keyword =>
        combinedText.includes(keyword.toLowerCase())
    );
}

// 건물명에서 도시 추출 함수
function extractCity(location) {
    const cityPatterns = {
        '서울': ['서울', '강남', '강북', '서초', '송파', '강동', '광진', '성동', '용산', '마포', '서대문', '은평', '노원', '도봉', '동대문', '중랑', '성북', '강서', '양천', '영등포', '구로', '금천', '관악', '동작', '종로', '중구'],
        '부산': ['부산', '해운대', '수영', '사하', '서구', '동구', '영도', '부산진', '동래', '남구', '북구', '강서구', '연제', '수영'],
        '제주': ['제주', '서귀포'],
        '인천': ['인천', '부평', '계양', '서구', '남동', '연수', '미추홀'],
        '대구': ['대구', '수성', '달서', '북구', '중구', '동구', '서구', '남구'],
        '대전': ['대전', '유성', '서구', '동구', '중구', '대덕'],
        '광주': ['광주', '북구', '광산', '서구', '남구', '동구'],
        '울산': ['울산', '남구', '동구', '북구', '중구', '울주'],
        '강릉': ['강릉'],
        '경주': ['경주'],
        '속초': ['속초']
    };

    for (const [city, patterns] of Object.entries(cityPatterns)) {
        if (patterns.some(pattern => location.includes(pattern))) {
            return city;
        }
    }

    return location.split(' ')[0]; // 첫 단어 반환
}

// 대중교통 경로 검색 함수
function searchPublicTransport(departure, destination) {
    const depCity = extractCity(departure);
    const destCity = extractCity(destination);
    const routeKey = `${departure}-${destination}`;
    const simplifiedKey = `${depCity}-${destCity}`;

    // 직접 매칭 시도
    if (publicTransportData[routeKey]) {
        return publicTransportData[routeKey];
    }

    if (publicTransportData[simplifiedKey]) {
        return publicTransportData[simplifiedKey];
    }

    // 주요 도시 간 기본 경로 시뮬레이션
    return {
        routes: [
            {
                type: 'simulated',
                steps: [
                    { icon: '🚇', type: 'subway', name: '지하철/버스', from: departure, to: destination, duration: 120, detail: '환승 2회' }
                ],
                totalTime: 120,
                fare: 2500,
                transfers: 2,
                firstTrain: '05:30',
                lastTrain: '23:30'
            }
        ]
    };
}

// 항공편 검색 함수
function searchFlights(departure, destination) {
    const isIntl = isInternational(departure, destination);
    const depCity = extractCity(departure);
    const destCity = extractCity(destination);

    const routeKey = `${depCity}-${destCity}`;
    const region = isIntl ? '해외' : '국내';

    if (flightData[region] && flightData[region][routeKey]) {
        return flightData[region][routeKey];
    }

    // 시뮬레이션 데이터 생성
    const simulatedDistance = isIntl ? 2000 : 500;
    const simulatedDuration = isIntl ? 240 : 70;

    return {
        airport: {
            departure: '인천국제공항' + (isIntl ? '' : ' 또는 김포공항'),
            arrival: destination + ' 공항'
        },
        distance: simulatedDistance,
        duration: simulatedDuration,
        flights: [
            { airline: '대한항공', flightNo: 'KE0000', time: '09:00 → ' + addMinutes('09:00', simulatedDuration), class: '이코노미', price: isIntl ? 500000 : 80000, stopover: '직항', bestDeal: false },
            { airline: 'LCC', flightNo: 'LC0000', time: '14:00 → ' + addMinutes('14:00', simulatedDuration), class: '이코노미', price: isIntl ? 350000 : 55000, stopover: '직항', bestDeal: true }
        ]
    };
}

// 시간 더하기 헬퍼 함수
function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}
