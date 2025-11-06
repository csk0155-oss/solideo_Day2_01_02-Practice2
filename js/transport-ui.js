// 교통수단 UI 관리

class TransportUI {
    constructor() {
        this.currentTransport = 'car';
        this.setupTabListeners();
    }

    // 탭 리스너 설정
    setupTabListeners() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTransport(tab.dataset.transport);
            });
        });
    }

    // 교통수단 전환
    switchTransport(transport) {
        this.currentTransport = transport;

        // 탭 활성화
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-transport="${transport}"]`).classList.add('active');

        // 정보 카드 표시/숨김
        document.getElementById('carRouteInfo').classList.toggle('hidden', transport !== 'car');
        document.getElementById('publicRouteInfo').classList.toggle('hidden', transport !== 'public');
        document.getElementById('flightRouteInfo').classList.toggle('hidden', transport !== 'flight');
    }

    // 대중교통 정보 표시
    displayPublicTransport(departure, destination) {
        const data = searchPublicTransport(departure, destination);
        const bestRoute = data.routes[0]; // 첫 번째 경로가 최적

        document.getElementById('publicEstimatedTime').textContent = `${bestRoute.totalTime}분`;
        document.getElementById('publicTransfers').textContent = `${bestRoute.transfers}회`;
        document.getElementById('publicFare').textContent = `${bestRoute.fare.toLocaleString()}원`;
        document.getElementById('publicOperationTime').textContent = `${bestRoute.firstTrain} ~ ${bestRoute.lastTrain}`;

        // 경로 상세 표시
        const detailContainer = document.getElementById('publicRouteDetail');
        detailContainer.innerHTML = '';

        bestRoute.steps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = 'route-step';
            stepEl.innerHTML = `
                <div class="route-step-icon">${step.icon}</div>
                <div class="route-step-content">
                    <div class="route-step-title">${step.name}</div>
                    <div class="route-step-detail">${step.from} → ${step.to} (${step.detail})</div>
                </div>
                <div class="route-step-time">${step.duration}분</div>
            `;
            detailContainer.appendChild(stepEl);
        });
    }

    // 비행기 정보 표시
    displayFlight(departure, destination) {
        const data = searchFlights(departure, destination);

        document.getElementById('flightDuration').textContent = `${Math.floor(data.duration / 60)}시간 ${data.duration % 60}분`;
        document.getElementById('flightDistance').textContent = `${data.distance}km`;
        document.getElementById('departureAirport').textContent = data.airport.departure;
        document.getElementById('arrivalAirport').textContent = data.airport.arrival;

        // 항공편 옵션 표시
        const optionsContainer = document.getElementById('flightOptions');
        optionsContainer.innerHTML = '';

        data.flights.forEach((flight, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = `flight-option ${flight.bestDeal ? 'best-deal' : ''}`;
            optionEl.innerHTML = `
                <div class="flight-option-info">
                    <div class="flight-airline">
                        ${flight.airline} ${flight.flightNo}
                        ${flight.bestDeal ? '<span class="best-deal-badge">최저가</span>' : ''}
                    </div>
                    <div class="flight-time">${flight.time}</div>
                    <div class="flight-details">${flight.class} · ${flight.stopover}</div>
                </div>
                <div class="flight-price">
                    <div class="flight-price-amount">₩${(flight.price / 1000).toFixed(0)}K</div>
                    <div class="flight-price-label">1인 기준</div>
                </div>
            `;
            optionsContainer.appendChild(optionEl);
        });
    }

    // 전체 비교 표시
    displayAll(departure, destination, departureTime) {
        // 탭 표시
        document.getElementById('transportTabs').classList.remove('hidden');

        // 자동차 정보는 기존 route.js에서 처리
        // 대중교통과 비행기 정보 표시
        this.displayPublicTransport(departure, destination);
        this.displayFlight(departure, destination);
    }
}

// 전역 인스턴스
const transportUI = new TransportUI();
