# [Scale Mate (2024.08.13 ~) ](https://scale-mate.vercel.app/)
기타 연주자를 위한 스케일 연습 웹 애플리케이션

## 데모
![ScaleMate_Demo](https://github.com/user-attachments/assets/cd9d1a19-a492-49ca-960b-398bd1441dd4)

## 개요
기타 연주자들이 다양한 스케일을 연습할 수 있도록 돕는다.   
가상 프렛보드와 메트로놈을 구현하여, 사용자 설정(스케일, key, bpm)에 따른 스케일 연주 시뮬레이션을 제공한다.

## 주요 기능
#### 1. 사용자 설정 보드
- 사용자는 [Scale, Key, BPM, Subdivision]를 선택하고 저장한다.
- 가상 프렛보드에서 추가로 블록을 선택할 수 있다.
- Subdivision은 한 박에 들어가는 음의 개수이다.

#### 2. 가상 메트로놈
- 사용자 설정 BPM에 맞춘 메트로놈을 시각화한 컴포넌트.
- 프렛보드의 스케일 연주와 독립적으로 On/Off 할 수 있다.

#### 3. 가상 프렛보드
- 기타 지판을 시각화
- [재생중인 노트, 스케일에 속한 노트, , 블록 노트, 루트 노트]를 색상과 투명도로 구분하여 하이라이팅
- 프렛 넓이, 줄 두께, 포지션 마크 등 실제 기타 비율에 맞는 디자인
  
#### 4. 스케일 연주 시뮬레이션
- 오디오 처리 : Tone.js를 활용하여 정확한 박자와 음정으로 스케일 재생
- 블록 선택 : 특정 블록을 선택하여 해당 위치의 스케일만 집중적으로 연습 가능
- [반복 재생 / 한 번만 재생] 모드
- 볼륨 컨트롤 : 볼륨 조절 및 음소거 기능

## 기술 스택:
- 프론트엔드: React, TypeScript, Vite
- 오디오 처리: Tone.js
- 스타일링: styled-components
- 상태 관리: React Hooks (useState, useEffect), 커스텀 훅 (useScalePlayer, useBlockData)
- 고객 지원: Channel.io
- 배포: Vercel
