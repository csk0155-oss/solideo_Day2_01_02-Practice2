// 메인 애플리케이션 로직
class TravelApp {
    constructor() {
        this.travelData = {
            departure: '',
            destination: '',
            departureTime: null,
            duration: 0,
            transportType: ''
        };

        this.init();
    }

    // 초기화
    init() {
        // 출발 시간 입력란에 현재 시간 설정
        this.setDefaultDateTime();

        // 지도 초기화
        if (typeof mapManager !== 'undefined') {
            mapManager.initMap();
        }

        // 폼 제출 이벤트 리스너
        const form = document.getElementById('travelForm');
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        console.log('여행 개인화 앱이 시작되었습니다.');
    }

    // 기본 날짜/시간 설정
    setDefaultDateTime() {
        const now = new Date();

        // 다음날 오전 9시로 설정
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(9, 0, 0, 0);

        // datetime-local 형식으로 변환
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const hours = String(tomorrow.getHours()).padStart(2, '0');
        const minutes = String(tomorrow.getMinutes()).padStart(2, '0');

        const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;

        document.getElementById('departureTime').value = dateTimeString;
    }

    // 폼 제출 처리
    handleFormSubmit(e) {
        e.preventDefault();

        // 입력 데이터 수집
        this.travelData.departure = document.getElementById('departure').value.trim();
        this.travelData.destination = document.getElementById('destination').value.trim();
        this.travelData.departureTime = new Date(document.getElementById('departureTime').value);
        this.travelData.duration = parseInt(document.getElementById('duration').value);
        this.travelData.transportType = document.getElementById('transportType').value;

        // 유효성 검사
        if (!this.validateInput()) {
            return;
        }

        // 여행 계획 시작
        this.startTravelPlanning();
    }

    // 입력 유효성 검사
    validateInput() {
        const { departure, destination, departureTime, duration } = this.travelData;

        if (!departure || !destination) {
            alert('출발지와 도착지를 모두 입력해주세요.');
            return false;
        }

        if (!departureTime || isNaN(departureTime.getTime())) {
            alert('올바른 출발 시간을 선택해주세요.');
            return false;
        }

        if (duration <= 0) {
            alert('여행 기간은 1일 이상이어야 합니다.');
            return false;
        }

        // 출발 시간이 과거인지 확인
        const now = new Date();
        if (departureTime < now) {
            const confirmPast = confirm(
                '출발 시간이 과거입니다. 그래도 계속하시겠습니까?\n(테스트 목적으로 허용됩니다)'
            );
            if (!confirmPast) {
                return false;
            }
        }

        return true;
    }

    // 여행 계획 시작
    startTravelPlanning() {
        const { departure, destination, departureTime, duration, transportType } = this.travelData;

        console.log('여행 계획 시작:', this.travelData);

        // 공통 정보 표시
        document.getElementById('departureLocation').textContent = departure;
        document.getElementById('destinationLocation').textContent = destination;

        // 1. 교통수단별 경로 표시
        this.displayRoute(departure, destination, departureTime, transportType);

        // 2. 맛집 추천 표시
        this.displayRestaurants(destination);

        // 3. 취향 선택 버튼 활성화
        this.setupPreferences(destination);

        // 4. 성공 메시지
        this.showSuccessMessage(departure, destination, duration, transportType);
    }

    // 경로 정보 표시
    displayRoute(departure, destination, departureTime, transportType) {
        // 지도에 경로 표시
        if (typeof mapManager !== 'undefined') {
            mapManager.displayRoute(departure, destination, transportType);
        }

        // 자동차 경로 (기존 기능)
        if (transportType === 'car' || transportType === 'all') {
            routeOptimizer.displayRouteInfo(departure, destination, departureTime);
        }

        // 대중교통
        if (transportType === 'public' || transportType === 'all') {
            transportUI.displayPublicTransport(departure, destination);
        }

        // 비행기
        if (transportType === 'flight' || transportType === 'all') {
            transportUI.displayFlight(departure, destination);
        }

        // 전체 비교 시 탭 표시
        if (transportType === 'all') {
            document.getElementById('transportTabs').classList.remove('hidden');
        } else {
            // 단일 교통수단 선택 시 해당 정보만 표시
            document.getElementById('carRouteInfo').classList.toggle('hidden', transportType !== 'car');
            document.getElementById('publicRouteInfo').classList.toggle('hidden', transportType !== 'public');
            document.getElementById('flightRouteInfo').classList.toggle('hidden', transportType !== 'flight');
        }
    }

    // 맛집 추천 표시
    displayRestaurants(destination) {
        restaurantRecommender.displayRestaurants(destination);
    }

    // 취향 선택 설정
    setupPreferences(destination) {
        attractionRecommender.setupPreferenceButtons(destination);
    }

    // 성공 메시지 표시
    showSuccessMessage(departure, destination, duration) {
        // 알림 대신 화면에 표시
        setTimeout(() => {
            const message = `
                ${departure}에서 ${destination}까지 ${duration}일 여행 계획이 준비되었습니다!
                아래 정보를 확인하고 취향을 선택하여 맞춤 여행지를 추천받으세요.
            `;

            // 화면 상단에 메시지 표시 (간단한 토스트 메시지)
            this.showToast(message, 'success');

            // 지도 섹션으로 스크롤 (지도가 있으면 지도로, 없으면 경로 섹션으로)
            const mapSection = document.getElementById('mapSection');
            const targetSection = mapSection && !mapSection.classList.contains('hidden')
                ? mapSection
                : document.getElementById('routeSection');

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    }

    // 토스트 메시지 표시
    showToast(message, type = 'info') {
        // 기존 토스트가 있으면 제거
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }

        // 새 토스트 생성
        const toast = document.createElement('div');
        toast.className = `toast-message toast-${type}`;
        toast.textContent = message;

        // 스타일 추가
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#50C878' : '#4A90E2'};
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 80%;
            text-align: center;
            font-size: 1em;
            animation: slideDown 0.5s ease-out;
        `;

        document.body.appendChild(toast);

        // 5초 후 제거
        setTimeout(() => {
            toast.style.animation = 'slideUp 0.5s ease-out';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    // 앱 리셋
    reset() {
        // 데이터 초기화
        this.travelData = {
            departure: '',
            destination: '',
            departureTime: null,
            duration: 0
        };

        // 폼 리셋
        document.getElementById('travelForm').reset();

        // 각 모듈 리셋
        routeOptimizer.reset();
        restaurantRecommender.reset();
        attractionRecommender.reset();

        // 지도 초기화
        if (typeof mapManager !== 'undefined') {
            mapManager.clearMap();
            mapManager.hideMap();
        }

        // 섹션 숨기기
        document.getElementById('routeSection').classList.add('hidden');
        document.getElementById('restaurantSection').classList.add('hidden');
        document.getElementById('preferenceSection').classList.add('hidden');
        document.getElementById('attractionSection').classList.add('hidden');

        // 기본 시간 재설정
        this.setDefaultDateTime();

        console.log('앱이 리셋되었습니다.');
    }
}

// 애니메이션 CSS 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// DOM이 로드되면 앱 시작
document.addEventListener('DOMContentLoaded', () => {
    window.travelApp = new TravelApp();
    console.log('여행 개인화 앱이 준비되었습니다! 🌍');
});

// 개발자 도구용 전역 함수
window.resetApp = () => {
    if (window.travelApp) {
        window.travelApp.reset();
    }
};
