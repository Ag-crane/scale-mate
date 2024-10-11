import { now } from "tone";

// 현재 시간으로부터 다음 박자 시작 시점까지의 시간을 계산하는 함수
export const getTimeUntilNextBeat = (bpm: number): number => {
    const secondsPerBeat = 60 / bpm;
    const currentTime = now();
    return secondsPerBeat - (currentTime % secondsPerBeat);
};
