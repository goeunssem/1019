export type WorryCategory = 'can_change' | 'cannot_change';

export type EmotionType =
  | '불안해요'
  | '속상해요'
  | '두려워요'
  | '부끄러워요'
  | '화나요'
  | '답답해요'
  | '외로워요'
  | '걱정돼요';

export interface WorryItem {
  id: string;
  title: string;
  content: string;
  emotion: EmotionType;
  dollId: string;
  category: WorryCategory;
  actionStep?: string;
  isActionCompleted?: boolean;
  actionCompletedAt?: string;
  isRelieved: boolean;
  relievedAt?: string;
  createdAt: string;
}

export interface DollCharacter {
  id: string;
  name: string;
  title: string;
  description: string;
  colorName: string;
  bgLight: string;
  textColor: string;
  quote: string;
  comfortMessage: string;
}

export interface ControlGuideExample {
  title: string;
  description: string;
  category: WorryCategory;
  tag: string;
}
