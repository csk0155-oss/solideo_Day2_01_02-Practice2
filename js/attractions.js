// 여행지 추천 기능
class AttractionRecommender {
    constructor() {
        this.currentDestination = null;
        this.currentPreference = null;
    }

    // 취향별 여행지 가져오기
    getAttractions(destination, preference) {
        this.currentDestination = destination;
        this.currentPreference = preference;

        const destinationData = attractionsData[destination];

        if (!destinationData || !destinationData[preference]) {
            return [];
        }

        return destinationData[preference];
    }

    // 여행지 카드 생성
    createAttractionCard(attraction) {
        const card = document.createElement('div');
        card.className = 'attraction-card';

        card.innerHTML = `
            <div class="attraction-image">${attraction.icon}</div>
            <div class="attraction-content">
                <h3>${attraction.name}</h3>
                <div class="attraction-tags">
                    ${attraction.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <p class="attraction-description">${attraction.description}</p>
            </div>
        `;

        return card;
    }

    // 여행지 리스트 표시
    displayAttractions(destination, preference) {
        const attractions = this.getAttractions(destination, preference);
        const attractionList = document.getElementById('attractionList');

        // 기존 내용 제거
        attractionList.innerHTML = '';

        if (attractions.length === 0) {
            attractionList.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                    <p style="font-size: 1.2em; color: #666;">
                        죄송합니다. 해당 취향의 여행지 정보가 아직 준비되지 않았습니다.
                    </p>
                </div>
            `;
        } else {
            // 각 여행지 카드 추가
            attractions.forEach((attraction, index) => {
                const card = this.createAttractionCard(attraction);

                // 순차적 애니메이션 효과
                setTimeout(() => {
                    card.classList.add('fade-in');
                    attractionList.appendChild(card);
                }, index * 100);
            });
        }

        // 섹션 표시
        document.getElementById('attractionSection').classList.remove('hidden');
        document.getElementById('attractionSection').classList.add('fade-in');

        // 스크롤을 여행지 섹션으로 부드럽게 이동
        setTimeout(() => {
            document.getElementById('attractionSection').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }

    // 취향 버튼 설정
    setupPreferenceButtons(destination) {
        const buttons = document.querySelectorAll('.preference-btn');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // 모든 버튼의 active 클래스 제거
                buttons.forEach(btn => btn.classList.remove('active'));

                // 클릭된 버튼에 active 클래스 추가
                button.classList.add('active');

                // 선택된 취향 가져오기
                const preference = button.dataset.preference;

                // 여행지 표시
                this.displayAttractions(destination, preference);
            });
        });

        // 섹션 표시
        document.getElementById('preferenceSection').classList.remove('hidden');
        document.getElementById('preferenceSection').classList.add('fade-in');
    }

    // 취향 이름 한글로 변환
    getPreferenceName(preference) {
        const names = {
            nature: '자연/힐링',
            culture: '문화/역사',
            activity: '액티비티',
            shopping: '쇼핑',
            photo: '포토스팟',
            local: '로컬 체험'
        };
        return names[preference] || preference;
    }

    // 리셋
    reset() {
        this.currentDestination = null;
        this.currentPreference = null;

        const attractionList = document.getElementById('attractionList');
        if (attractionList) {
            attractionList.innerHTML = '';
        }

        // 모든 취향 버튼의 active 클래스 제거
        const buttons = document.querySelectorAll('.preference-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
    }
}

// 전역 인스턴스 생성
const attractionRecommender = new AttractionRecommender();
