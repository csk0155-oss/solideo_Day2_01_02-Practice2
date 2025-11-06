// 맛집 추천 기능
class RestaurantRecommender {
    constructor() {
        this.restaurants = [];
    }

    // 도착지별 맛집 가져오기 (평점순 정렬)
    getRestaurants(destination) {
        let restaurants = restaurantsData[destination] || [];

        // 평점순으로 정렬 (높은 순)
        this.restaurants = restaurants.sort((a, b) => b.rating - a.rating);

        return this.restaurants;
    }

    // 별점 생성 (시각적 표현)
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }

        if (hasHalfStar) {
            stars += '✨';
        }

        return stars;
    }

    // 맛집 카드 생성
    createRestaurantCard(restaurant) {
        const card = document.createElement('div');
        card.className = 'restaurant-card';

        card.innerHTML = `
            <h3>${restaurant.name}</h3>
            <div class="restaurant-rating">
                <span class="stars">${this.generateStars(restaurant.rating)}</span>
                <span class="rating-value">${restaurant.rating.toFixed(1)}</span>
            </div>
            <div class="restaurant-info">
                <p><strong>카테고리:</strong> ${restaurant.category}</p>
                <p><strong>주소:</strong> ${restaurant.address}</p>
                <p><strong>대표 메뉴:</strong> ${restaurant.specialty}</p>
                <p><strong>가격대:</strong> ${restaurant.priceRange}</p>
            </div>
        `;

        // 호버 효과를 위한 애니메이션
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        return card;
    }

    // 맛집 리스트 표시
    displayRestaurants(destination) {
        const restaurants = this.getRestaurants(destination);
        const restaurantList = document.getElementById('restaurantList');

        // 기존 내용 제거
        restaurantList.innerHTML = '';

        if (restaurants.length === 0) {
            restaurantList.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                    <p style="font-size: 1.2em; color: #666;">
                        죄송합니다. ${destination}의 맛집 정보가 아직 준비되지 않았습니다.
                    </p>
                </div>
            `;
        } else {
            // 각 맛집 카드 추가
            restaurants.forEach((restaurant, index) => {
                const card = this.createRestaurantCard(restaurant);

                // 순차적 애니메이션 효과
                setTimeout(() => {
                    card.classList.add('fade-in');
                    restaurantList.appendChild(card);
                }, index * 100);
            });
        }

        // 섹션 표시
        document.getElementById('restaurantSection').classList.remove('hidden');
        document.getElementById('restaurantSection').classList.add('fade-in');
    }

    // 평점별 필터링
    filterByRating(minRating) {
        return this.restaurants.filter(r => r.rating >= minRating);
    }

    // 카테고리별 필터링
    filterByCategory(category) {
        return this.restaurants.filter(r => r.category === category);
    }

    // 리셋
    reset() {
        this.restaurants = [];
        const restaurantList = document.getElementById('restaurantList');
        if (restaurantList) {
            restaurantList.innerHTML = '';
        }
    }
}

// 전역 인스턴스 생성
const restaurantRecommender = new RestaurantRecommender();
