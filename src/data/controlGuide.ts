import { ControlGuideExample } from '../types/worry';

export const CONTROL_EXAMPLES: ControlGuideExample[] = [
  {
    title: '내일 시험이나 발표',
    description: '시험 날짜는 바꿀 수 없지만, 오늘 15분 동안 소리 내어 복습하는 건 내가 바꿀 수 있어요.',
    category: 'can_change',
    tag: '준비와 연습',
  },
  {
    title: '소풍날 비가 올까 봐 걱정돼요',
    description: '하늘의 날씨는 내가 바꿀 수 없어요. 걱정 상자에 넣고 따뜻한 옷이나 우산을 챙기면 충분해요.',
    category: 'cannot_change',
    tag: '자연과 날씨',
  },
  {
    title: '친구와 사소한 일로 다퉜어요',
    description: '친구의 마음을 억지로 바꿀 순 없지만, 내 솔직한 사과나 대화 쪽지를 건네는 건 내가 할 수 있어요.',
    category: 'can_change',
    tag: '나의 말과 행동',
  },
  {
    title: '친구가 나를 안 좋아할까 봐 불안해요',
    description: '다른 사람의 생각이나 마음은 내 힘으로 바꿀 수 없어요. 인형에게 맡기고 나 자신의 멋진 점에 집중해요.',
    category: 'cannot_change',
    tag: '다른 사람의 생각',
  },
  {
    title: '어제 한 실수가 자꾸 떠올라 부끄러워요',
    description: '이미 지나간 어제의 일은 아무리 걱정해도 바꿀 수 없어요. 오늘부터 새롭게 시작하면 돼요.',
    category: 'cannot_change',
    tag: '이미 지나간 일',
  },
  {
    title: '수업 시간에 선생님 말씀이 이해가 안 돼요',
    description: '모르는 건 부끄러운 게 아니에요. 쉬는 시간에 선생님께 "이 부분 다시 알려주세요" 여쭤볼 수 있어요.',
    category: 'can_change',
    tag: '도움 요청하기',
  },
];

export const ACTION_SUGGESTIONS = [
  '집에서 거울 보고 3번 또박또박 소리 내어 연습하기',
  '마음이 가라앉을 때까지 깊게 심호흡 5번 하기',
  '친구에게 "아까는 미안했어" 짧은 편지나 쪽지 건네기',
  '오늘 꼭 해야 할 준비물 3가지를 책가방에 미리 챙기기',
  '쉬는 시간에 선생님이나 부모님께 조용히 털어놓기',
  '따뜻한 물 한 잔 천천히 마시며 어깨 힘 빼기',
  '좋아하는 노래 들으며 10분 동안 기분 전환하기',
  '내가 직접 작은 실천 적어보기',
];

export const RELIEF_AFFIRMATIONS = [
  '내가 바꿀 수 없는 일은 내 잘못이 아니야.',
  '걱정 인형이 밤새 단단히 지켜줄 테니 안심해.',
  '오늘 하루도 씩씩하게 잘 해냈어!',
  '마음이 편안해지도록 천천히 숨을 쉬어보자.',
  '내일은 새로운 아침이 찾아올 거야.',
];
