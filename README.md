# Bunnit Frontend 과제

## 프로젝트 개요

이 프로젝트는 **React Native**를 사용하여 **하단 탭 내비게이션**과 **캘린더 컴포넌트**를 구현하는 과제입니다. 주어진 요구사항에 따라, 외부 라이브러리를 사용하지 않고 캘린더를 직접 제작하며, React Native의 애니메이션과 제스처 라이브러리를 활용해 월/주 캘린더 전환 기능을 구현했습니다.

---

## 문제 요구사항 및 구현 결과

### Level 1: 하단 탭 내비게이션 구현

#### 요구사항

- 하단에 **Bottom Tabs Navigator**를 추가합니다.
- 4개의 탭(홈, 캘린더, 라이브러리, 마이페이지)을 생성하고, 각각 독립적인 화면과 연결합니다.

#### 구현 결과

![과제1](https://github.com/user-attachments/assets/583e4e9c-0d3e-46a7-a3fa-79a93373e06a)

- 하단 탭 내비게이션이 추가되었으며, 각 탭마다 고유한 화면(HomeScreen, CalendarScreen, LibraryScreen, MyPageScreen)을 구현했습니다.
- 각 탭은 React Navigation을 사용하여 연결하였습니다.

---

### Level 2: 캘린더 컴포넌트 구현

#### 요구사항

1. 캘린더에 **현재 월**과 **오늘 날짜**를 표시합니다.
2. 상단의 좌/우 화살표 버튼을 클릭하면 이전/다음 달로 이동합니다.
3. 특정 날짜를 선택하면 해당 날짜에 **선택 표시**(원)를 표시하며, 마지막으로 선택된 날짜만 유지됩니다.

#### 구현 결과

![과제2](https://github.com/user-attachments/assets/c3f1588c-4492-435e-9bb6-86261c7f2a32)

- **현재 월 출력**: 현재 월의 날짜와 오늘 날짜를 강조 표시했습니다.
- **이전/다음 달로 이동**: 화살표 버튼 클릭으로 이전/다음 달을 탐색할 수 있습니다.
- **특정 날짜 선택**: 선택된 날짜만 강조 표시되며, 선택 상태가 유지됩니다.

---

### Level 3: 월/주 캘린더 전환 애니메이션 구현

#### 요구사항

1. **React Native Gesture Handler**와 **Reanimated**를 이용해 제스처 이벤트로 캘린더의 월/주 형태를 전환합니다.
   - **위로 스와이프**: 월간 캘린더에서 주간 캘린더로 전환
   - **아래로 스와이프**: 주간 캘린더에서 월간 캘린더로 전환
2. 좌우 스와이프 동작으로 이전/다음 달 또는 주로 이동합니다.

#### 구현 결과

![과제3](https://github.com/user-attachments/assets/6a24db7f-9027-4ad6-9acd-d757f260ef14)

- 스와이프 제스처를 통해 자연스럽게 캘린더 형태가 월간/주간으로 전환됩니다.
- 좌우 스와이프를 통해 이전/다음 달(또는 주)로 이동합니다.
- 애니메이션은 React Native Reanimated와 Gesture Handler를 사용하여 부드럽게 구현되었습니다.

---

## 주요 기술 스택

- **React Native**: 앱 개발의 기본 프레임워크
- **React Navigation**: 하단 탭 내비게이션 구현
- **React Native Gesture Handler**: 스와이프 제스처 인식
- **React Native Reanimated**: 부드러운 애니메이션 구현
- **FlatList**: 캘린더의 날짜 렌더링

---

## 실행 방법

1. **프로젝트 클론**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **앱 실행**

   ```bash
   npm start
   ```

4. **시뮬레이터 또는 기기에서 실행**
   - iOS: `npm run ios`
   - Android: `npm run android`

---

## 프로젝트 폴더 구조

```plaintext
src/
├── screens/
│   ├── Home/
│   │   └── HomeScreen.tsx
│   ├── Library/
│   │   └── LibraryScreen.tsx
│   ├── MyPage/
│   │   └── MyPageScreen.tsx
│   └── Calendar/
│       ├── CalendarScreen.tsx
│       └── CalendarScreen.styles.ts
└── App.tsx
```
