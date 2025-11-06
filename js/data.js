// 여행지별 맛집 데이터
const restaurantsData = {
    '부산': [
        {
            name: '해운대 할매국밥',
            rating: 4.8,
            category: '한식',
            address: '부산 해운대구 해운대해변로 264',
            specialty: '돼지국밥, 수육',
            priceRange: '8,000원 ~ 15,000원'
        },
        {
            name: '광안리 횟집 바다향',
            rating: 4.7,
            category: '회/해산물',
            address: '부산 수영구 광안해변로 219',
            specialty: '모둠회, 해산물찜',
            priceRange: '30,000원 ~ 80,000원'
        },
        {
            name: '국제시장 씨앗호떡',
            rating: 4.6,
            category: '분식/간식',
            address: '부산 중구 신창동 4가',
            specialty: '씨앗호떡',
            priceRange: '1,500원 ~ 3,000원'
        },
        {
            name: '송정 해녀촌',
            rating: 4.5,
            category: '해산물',
            address: '부산 해운대구 송정해변로 50',
            specialty: '성게비빔밥, 해산물라면',
            priceRange: '12,000원 ~ 25,000원'
        }
    ],
    '제주': [
        {
            name: '올레국수',
            rating: 4.9,
            category: '한식',
            address: '제주시 구좌읍 해맞이해안로 1282',
            specialty: '고기국수, 비빔국수',
            priceRange: '7,000원 ~ 9,000원'
        },
        {
            name: '성산 해녀의집',
            rating: 4.7,
            category: '해산물',
            address: '제주 서귀포시 성산읍 성산리',
            specialty: '전복죽, 성게국',
            priceRange: '15,000원 ~ 30,000원'
        },
        {
            name: '흑돼지 맛집 돈사돈',
            rating: 4.8,
            category: '고기',
            address: '제주시 노형로 200',
            specialty: '제주 흑돼지구이',
            priceRange: '18,000원 ~ 35,000원'
        },
        {
            name: '애월 해녀의 부엌',
            rating: 4.6,
            category: '해산물',
            address: '제주시 애월읍 애월해안로 123',
            specialty: '해물뚝배기, 해산물칼국수',
            priceRange: '10,000원 ~ 20,000원'
        }
    ],
    '서울': [
        {
            name: '광장시장 마약김밥',
            rating: 4.7,
            category: '분식',
            address: '서울 종로구 창경궁로 88',
            specialty: '마약김밥, 떡볶이',
            priceRange: '3,000원 ~ 8,000원'
        },
        {
            name: '을지로 족발골목',
            rating: 4.6,
            category: '한식',
            address: '서울 중구 을지로 142',
            specialty: '족발, 보쌈',
            priceRange: '25,000원 ~ 50,000원'
        },
        {
            name: '이태원 만리장성',
            rating: 4.8,
            category: '중식',
            address: '서울 용산구 이태원로 154',
            specialty: '짜장면, 탕수육',
            priceRange: '8,000원 ~ 30,000원'
        },
        {
            name: '강남 무한리필 고깃집',
            rating: 4.5,
            category: '고기',
            address: '서울 강남구 테헤란로 123',
            specialty: '한우, 돼지고기 무한리필',
            priceRange: '19,900원 ~ 29,900원'
        }
    ],
    '강릉': [
        {
            name: '초당순두부마을',
            rating: 4.8,
            category: '한식',
            address: '강원 강릉시 초당순두부길 77',
            specialty: '순두부찌개, 손두부',
            priceRange: '7,000원 ~ 12,000원'
        },
        {
            name: '안목해변 커피거리',
            rating: 4.7,
            category: '카페/디저트',
            address: '강원 강릉시 창해로 14번길',
            specialty: '핸드드립 커피, 빵',
            priceRange: '5,000원 ~ 12,000원'
        },
        {
            name: '정동진 횟집',
            rating: 4.6,
            category: '회/해산물',
            address: '강원 강릉시 강동면 정동진리',
            specialty: '모둠회, 매운탕',
            priceRange: '30,000원 ~ 70,000원'
        },
        {
            name: '교동반점',
            rating: 4.5,
            category: '중식',
            address: '강원 강릉시 금성로 17',
            specialty: '짬뽕, 짜장면',
            priceRange: '7,000원 ~ 15,000원'
        }
    ]
};

// 취향별 여행지 데이터
const attractionsData = {
    '부산': {
        nature: [
            {
                name: '해운대 해수욕장',
                icon: '🏖️',
                tags: ['해변', '일몰', '산책'],
                description: '한국에서 가장 유명한 해수욕장으로 아름다운 백사장과 맑은 바다를 자랑합니다.'
            },
            {
                name: '태종대',
                icon: '🌊',
                tags: ['절벽', '등대', '자연경관'],
                description: '울창한 숲과 기암괴석, 푸른 바다가 어우러진 절경을 감상할 수 있습니다.'
            },
            {
                name: '이기대 해안산책로',
                icon: '🥾',
                tags: ['트레킹', '해안절벽', '포토존'],
                description: '해안 절벽을 따라 걷는 아름다운 산책로로 사진 촬영 명소입니다.'
            }
        ],
        culture: [
            {
                name: '감천문화마을',
                icon: '🏘️',
                tags: ['예술', '골목길', '포토존'],
                description: '알록달록한 집들이 계단식으로 늘어선 예술마을입니다.'
            },
            {
                name: '부산 박물관',
                icon: '🏛️',
                tags: ['역사', '문화', '교육'],
                description: '부산의 역사와 문화를 한눈에 볼 수 있는 종합 박물관입니다.'
            },
            {
                name: '국제시장',
                icon: '🏪',
                tags: ['전통시장', '먹거리', '쇼핑'],
                description: '부산의 역사를 품은 전통시장으로 다양한 먹거리와 물건을 구경할 수 있습니다.'
            }
        ],
        activity: [
            {
                name: '송도 해상케이블카',
                icon: '🚡',
                tags: ['케이블카', '바다', '전망'],
                description: '바다 위를 가로지르는 케이블카로 멋진 전망을 즐길 수 있습니다.'
            },
            {
                name: '광안리 SUP',
                icon: '🏄',
                tags: ['서핑', '수상스포츠', '액티비티'],
                description: '광안대교를 배경으로 SUP 보드를 즐길 수 있는 인기 액티비티입니다.'
            }
        ],
        shopping: [
            {
                name: '서면 지하상가',
                icon: '🛍️',
                tags: ['쇼핑', '의류', '액세서리'],
                description: '부산 최대 규모의 지하쇼핑몰로 다양한 상품을 저렴하게 구매할 수 있습니다.'
            },
            {
                name: '신세계 센텀시티',
                icon: '🏬',
                tags: ['백화점', '쇼핑', '맛집'],
                description: '세계 최대 규모의 백화점으로 쇼핑과 문화생활을 동시에 즐길 수 있습니다.'
            }
        ],
        photo: [
            {
                name: '흰여울 문화마을',
                icon: '📸',
                tags: ['포토존', '카페', '바다전망'],
                description: '절영해안산책로 끝자락의 아름다운 마을로 인생샷 명소입니다.'
            },
            {
                name: '청사포 다릿돌 전망대',
                icon: '🌅',
                tags: ['일출', '전망대', '포토존'],
                description: '청사포 바다 위에 떠 있는 다릿돌 전망대로 멋진 사진을 찍을 수 있습니다.'
            }
        ],
        local: [
            {
                name: '자갈치 시장',
                icon: '🐟',
                tags: ['수산시장', '회', '먹거리'],
                description: '부산 대표 수산시장으로 신선한 해산물을 맛볼 수 있습니다.'
            },
            {
                name: '부산 야시장',
                icon: '🌃',
                tags: ['야시장', '먹거리', '야경'],
                description: '저녁에 열리는 야시장으로 다양한 먹거리와 볼거리를 즐길 수 있습니다.'
            }
        ]
    },
    '제주': {
        nature: [
            {
                name: '한라산',
                icon: '⛰️',
                tags: ['등산', '자연', '백록담'],
                description: '한국에서 가장 높은 산으로 아름다운 자연경관을 자랑합니다.'
            },
            {
                name: '성산일출봉',
                icon: '🌅',
                tags: ['일출', '세계유산', '트레킹'],
                description: 'UNESCO 세계자연유산으로 지정된 화산섬의 멋진 일출 명소입니다.'
            },
            {
                name: '우도',
                icon: '🏝️',
                tags: ['섬', '자전거', '해변'],
                description: '제주도 옆 작은 섬으로 에메랄드빛 바다와 아름다운 경관을 자랑합니다.'
            }
        ],
        culture: [
            {
                name: '제주 민속촌',
                icon: '🏘️',
                tags: ['전통', '문화', '체험'],
                description: '제주도의 전통 생활상을 재현한 야외 박물관입니다.'
            },
            {
                name: '돌하르방 공원',
                icon: '🗿',
                tags: ['전통', '조각', '포토존'],
                description: '제주의 상징 돌하르방을 주제로 한 공원입니다.'
            }
        ],
        activity: [
            {
                name: '협재 해수욕장',
                icon: '🏊',
                tags: ['해수욕', '스노클링', '물놀이'],
                description: '에메랄드빛 바다와 백사장이 아름다운 해수욕장입니다.'
            },
            {
                name: '천제연 폭포',
                icon: '💦',
                tags: ['폭포', '트레킹', '자연'],
                description: '세 개의 폭포가 이어지는 아름다운 자연경관입니다.'
            }
        ],
        shopping: [
            {
                name: '제주 동문시장',
                icon: '🛍️',
                tags: ['전통시장', '특산물', '먹거리'],
                description: '제주 최대 전통시장으로 다양한 특산물을 구매할 수 있습니다.'
            },
            {
                name: '이니스프리 하우스',
                icon: '🌿',
                tags: ['화장품', '체험', '카페'],
                description: '이니스프리 브랜드 체험관으로 쇼핑과 체험을 동시에 즐길 수 있습니다.'
            }
        ],
        photo: [
            {
                name: '섭지코지',
                icon: '📷',
                tags: ['해안절벽', '일출', '포토존'],
                description: '아름다운 해안 절벽과 등대가 있는 인생샷 명소입니다.'
            },
            {
                name: '협재 쌍둥이해변',
                icon: '🏖️',
                tags: ['해변', '일몰', '비양도'],
                description: '투명한 바다와 비양도가 보이는 아름다운 해변입니다.'
            }
        ],
        local: [
            {
                name: '제주 올레시장',
                icon: '🍊',
                tags: ['전통시장', '한라봉', '특산물'],
                description: '제주 특산물을 저렴하게 구매할 수 있는 시장입니다.'
            },
            {
                name: '애월 카페거리',
                icon: '☕',
                tags: ['카페', '오션뷰', '디저트'],
                description: '바다를 보며 커피를 즐길 수 있는 카페거리입니다.'
            }
        ]
    },
    '서울': {
        nature: [
            {
                name: '남산',
                icon: '🗼',
                tags: ['타워', '전망', '야경'],
                description: 'N서울타워가 있는 서울의 랜드마크로 아름다운 야경을 감상할 수 있습니다.'
            },
            {
                name: '한강공원',
                icon: '🚴',
                tags: ['자전거', '산책', '피크닉'],
                description: '서울 시민들의 휴식처로 다양한 여가활동을 즐길 수 있습니다.'
            }
        ],
        culture: [
            {
                name: '경복궁',
                icon: '🏯',
                tags: ['궁궐', '역사', '한복체험'],
                description: '조선시대 대표 궁궐로 한국의 역사와 문화를 체험할 수 있습니다.'
            },
            {
                name: '국립중앙박물관',
                icon: '🏛️',
                tags: ['박물관', '역사', '문화'],
                description: '한국의 역사와 문화유산을 한눈에 볼 수 있는 대형 박물관입니다.'
            },
            {
                name: '인사동',
                icon: '🎨',
                tags: ['전통거리', '공예품', '카페'],
                description: '전통문화와 현대가 어우러진 거리로 다양한 공예품과 갤러리가 있습니다.'
            }
        ],
        activity: [
            {
                name: '롯데월드',
                icon: '🎢',
                tags: ['놀이공원', '어드벤처', '가족'],
                description: '실내외 놀이기구가 있는 대형 테마파크입니다.'
            },
            {
                name: '코엑스 아쿠아리움',
                icon: '🐠',
                tags: ['수족관', '해양생물', '체험'],
                description: '다양한 해양생물을 관람할 수 있는 대형 수족관입니다.'
            }
        ],
        shopping: [
            {
                name: '명동',
                icon: '🛍️',
                tags: ['쇼핑', '화장품', '먹거리'],
                description: '서울 대표 쇼핑거리로 화장품과 패션 아이템을 구매할 수 있습니다.'
            },
            {
                name: '강남역 지하상가',
                icon: '🏬',
                tags: ['지하상가', '의류', '액세서리'],
                description: '대형 지하상가로 다양한 상품을 저렴하게 구매할 수 있습니다.'
            },
            {
                name: '동대문 쇼핑타운',
                icon: '🌃',
                tags: ['야시장', '의류', '도매'],
                description: '24시간 열리는 패션 쇼핑의 메카입니다.'
            }
        ],
        photo: [
            {
                name: '북촌 한옥마을',
                icon: '🏠',
                tags: ['한옥', '전통', '포토존'],
                description: '전통 한옥이 보존된 마을로 인생샷 명소입니다.'
            },
            {
                name: '서울숲',
                icon: '🌳',
                tags: ['공원', '자연', '사진'],
                description: '도심 속 자연공원으로 사계절 아름다운 풍경을 자랑합니다.'
            }
        ],
        local: [
            {
                name: '광장시장',
                icon: '🍜',
                tags: ['전통시장', '먹거리', '빈대떡'],
                description: '100년 역사의 전통시장으로 다양한 한국 음식을 맛볼 수 있습니다.'
            },
            {
                name: '망원시장',
                icon: '🍢',
                tags: ['시장', '먹거리', '로컬'],
                description: '젊은 감성의 전통시장으로 핫한 먹거리가 많습니다.'
            }
        ]
    },
    '강릉': {
        nature: [
            {
                name: '경포해변',
                icon: '🏖️',
                tags: ['해변', '일출', '산책'],
                description: '넓은 백사장과 맑은 바다로 유명한 동해안 대표 해변입니다.'
            },
            {
                name: '정동진',
                icon: '🌅',
                tags: ['일출', '해변', '기차'],
                description: '세계에서 바다와 가장 가까운 기차역으로 일출 명소입니다.'
            },
            {
                name: '대관령 양떼목장',
                icon: '🐑',
                tags: ['목장', '자연', '힐링'],
                description: '푸른 초원에서 양떼를 만날 수 있는 힐링 명소입니다.'
            }
        ],
        culture: [
            {
                name: '오죽헌',
                icon: '🏛️',
                tags: ['문화재', '역사', '전통'],
                description: '신사임당과 율곡 이이의 생가로 한국의 역사를 체험할 수 있습니다.'
            },
            {
                name: '강릉 선교장',
                icon: '🏘️',
                tags: ['한옥', '전통', '문화'],
                description: '조선시대 사대부 가옥으로 전통건축의 아름다움을 감상할 수 있습니다.'
            }
        ],
        activity: [
            {
                name: '하슬라 아트월드',
                icon: '🎨',
                tags: ['미술관', '조각공원', '바다전망'],
                description: '바다가 보이는 언덕의 현대미술관으로 야외 조각공원도 있습니다.'
            },
            {
                name: '안목해변 서핑',
                icon: '🏄',
                tags: ['서핑', '수상스포츠', '해변'],
                description: '강릉의 서핑 성지로 초보자도 쉽게 서핑을 배울 수 있습니다.'
            }
        ],
        shopping: [
            {
                name: '중앙시장',
                icon: '🛍️',
                tags: ['전통시장', '특산물', '먹거리'],
                description: '강릉의 대표 전통시장으로 다양한 먹거리와 특산물이 있습니다.'
            },
            {
                name: '강문해변 상점가',
                icon: '🏪',
                tags: ['해변', '기념품', '카페'],
                description: '해변을 따라 늘어선 상점과 카페가 있는 쇼핑거리입니다.'
            }
        ],
        photo: [
            {
                name: '주문진 방파제',
                icon: '🌊',
                tags: ['방파제', '등대', '포토존'],
                description: 'BTS 앨범 자켓 촬영지로 유명한 인생샷 명소입니다.'
            },
            {
                name: '사천진 해변',
                icon: '📸',
                tags: ['해변', '포토존', '카페'],
                description: '감성 카페들이 늘어선 아름다운 해변입니다.'
            }
        ],
        local: [
            {
                name: '안목 커피거리',
                icon: '☕',
                tags: ['커피', '카페', '바다'],
                description: '한국 커피의 원조 거리로 바다를 보며 커피를 즐길 수 있습니다.'
            },
            {
                name: '초당순두부마을',
                icon: '🥘',
                tags: ['순두부', '먹거리', '전통'],
                description: '강릉 명물 순두부를 맛볼 수 있는 식당촌입니다.'
            }
        ]
    }
};

// 경로 정보 데이터 (출발지-도착지 조합)
const routeData = {
    '서울-부산': {
        distance: 325,
        baseTime: 240, // 기본 소요시간 (분)
        routes: ['경부고속도로', '중부내륙고속도로', '통영대전고속도로'],
        recommendedRoute: '경부고속도로 (가장 빠름)'
    },
    '서울-제주': {
        distance: 450,
        baseTime: 60, // 비행기 기준
        routes: ['김포공항-제주공항 (비행)', '인천공항-제주공항 (비행)'],
        recommendedRoute: '김포공항-제주공항 (가장 편리)'
    },
    '서울-강릉': {
        distance: 165,
        baseTime: 120,
        routes: ['영동고속도로', '중앙고속도로-동해고속도로'],
        recommendedRoute: '영동고속도로 (가장 빠름)'
    },
    '부산-제주': {
        distance: 300,
        baseTime: 60,
        routes: ['부산항-제주항 (페리)', '김해공항-제주공항 (비행)'],
        recommendedRoute: '김해공항-제주공항 (가장 빠름)'
    }
};
