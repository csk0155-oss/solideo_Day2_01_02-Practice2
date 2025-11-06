// 경로 최적화 기능
class RouteOptimizer {
    constructor() {
        this.currentTime = null;
        this.updateInterval = null;
    }

    // 실시간 시간 업데이트
    startRealTimeUpdate() {
        this.updateCurrentTime();
        this.updateInterval = setInterval(() => {
            this.updateCurrentTime();
        }, 1000); // 1초마다 업데이트
    }

    stopRealTimeUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = timeString;
        }

        this.currentTime = now;
    }

    // 최적 경로 계산
    calculateOptimalRoute(departure, destination, departureTime) {
        const routeKey = `${departure}-${destination}`;
        const reverseRouteKey = `${destination}-${departure}`;

        let routeInfo = routeData[routeKey] || routeData[reverseRouteKey];

        if (!routeInfo) {
            // 기본 경로 정보가 없는 경우 기본값 제공
            routeInfo = {
                distance: 200,
                baseTime: 180,
                routes: ['일반 도로', '고속도로'],
                recommendedRoute: '고속도로 (추천)'
            };
        }

        // 출발 시간에 따른 교통 상황 시뮬레이션
        const trafficFactor = this.getTrafficFactor(departureTime);
        const estimatedTime = Math.round(routeInfo.baseTime * trafficFactor);

        return {
            distance: routeInfo.distance,
            estimatedTime: estimatedTime,
            recommendedRoute: routeInfo.recommendedRoute,
            trafficStatus: this.getTrafficStatus(trafficFactor),
            routes: routeInfo.routes
        };
    }

    // 시간대별 교통 상황 계산 (실시간 시뮬레이션)
    getTrafficFactor(departureTime) {
        const hour = new Date(departureTime).getHours();

        // 출퇴근 시간대 (7-9시, 18-20시)
        if ((hour >= 7 && hour <= 9) || (hour >= 18 && hour <= 20)) {
            return 1.3; // 30% 더 걸림
        }
        // 점심 시간대 (12-13시)
        else if (hour >= 12 && hour <= 13) {
            return 1.15; // 15% 더 걸림
        }
        // 심야 시간대 (22-06시)
        else if (hour >= 22 || hour <= 6) {
            return 0.85; // 15% 단축
        }
        // 일반 시간대
        else {
            return 1.0;
        }
    }

    // 교통 상황 텍스트 반환
    getTrafficStatus(factor) {
        if (factor >= 1.25) {
            return '🔴 혼잡 (평소보다 느림)';
        } else if (factor >= 1.1) {
            return '🟡 보통 (약간 혼잡)';
        } else if (factor <= 0.9) {
            return '🟢 원활 (빠름)';
        } else {
            return '🟢 원활 (보통)';
        }
    }

    // 경로 정보 표시
    displayRouteInfo(departure, destination, departureTime) {
        const routeInfo = this.calculateOptimalRoute(departure, destination, departureTime);

        // 실시간 시간 업데이트 시작
        this.startRealTimeUpdate();

        // UI 업데이트
        document.getElementById('estimatedTime').textContent =
            `약 ${this.formatTime(routeInfo.estimatedTime)}`;

        document.getElementById('distance').textContent =
            `${routeInfo.distance}km`;

        document.getElementById('recommendedRoute').textContent =
            routeInfo.recommendedRoute;

        document.getElementById('trafficStatus').textContent =
            routeInfo.trafficStatus;

        // 섹션 표시
        document.getElementById('routeSection').classList.remove('hidden');
        document.getElementById('routeSection').classList.add('fade-in');

        // 일정 시간마다 교통 상황 재계산 (30초마다)
        setInterval(() => {
            const updatedInfo = this.calculateOptimalRoute(departure, destination, new Date());
            document.getElementById('trafficStatus').textContent = updatedInfo.trafficStatus;
            document.getElementById('estimatedTime').textContent =
                `약 ${this.formatTime(updatedInfo.estimatedTime)}`;
        }, 30000);
    }

    // 시간 포맷팅 (분 -> 시간/분)
    formatTime(minutes) {
        if (minutes < 60) {
            return `${minutes}분`;
        } else {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return mins > 0 ? `${hours}시간 ${mins}분` : `${hours}시간`;
        }
    }

    // 리셋
    reset() {
        this.stopRealTimeUpdate();
        this.currentTime = null;
    }
}

// 전역 인스턴스 생성
const routeOptimizer = new RouteOptimizer();
