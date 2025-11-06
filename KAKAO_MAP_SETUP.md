# Kakao Map API 설정 가이드

## 개요
이 애플리케이션은 경로 시각화를 위해 Kakao Map API를 사용합니다.

## API 키 설정 방법

### 1. Kakao Developers에서 앱 생성
1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 로그인 후 "내 애플리케이션" 메뉴 선택
3. "애플리케이션 추가하기" 클릭
4. 앱 이름 입력 후 생성

### 2. JavaScript 키 발급
1. 생성한 앱 선택
2. "앱 키" 섹션에서 "JavaScript 키" 확인
3. 키 복사

### 3. 플랫폼 등록
1. "플랫폼" 메뉴 선택
2. "Web 플랫폼 등록" 클릭
3. 사이트 도메인 등록 (예: http://localhost, https://yourdomain.com)

### 4. index.html에 키 적용
`index.html` 파일의 9번째 줄에서 `YOUR_APP_KEY`를 발급받은 JavaScript 키로 교체:

```html
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services"></script>
```

변경 예시:
```html
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=abc123def456&libraries=services"></script>
```

## API 키 없이 사용하기
API 키가 없어도 애플리케이션의 다른 기능들은 정상 작동합니다.
지도 섹션에는 시각적 플레이스홀더가 표시되며, 다음 정보를 보여줍니다:
- 출발지
- 도착지
- 교통수단

## 주의사항
- API 키는 공개 저장소에 직접 업로드하지 마세요
- 프로덕션 환경에서는 환경 변수나 설정 파일을 사용하세요
- 도메인 제한을 설정하여 무단 사용을 방지하세요

## 참고 자료
- [Kakao Map API 문서](https://apis.map.kakao.com/web/)
- [Kakao Developers 가이드](https://developers.kakao.com/docs/latest/ko/local/dev-guide)
