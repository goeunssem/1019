import { WorryItem } from '../types/worry';

const STORAGE_KEY = 'worry_doll_box_items_v1';

const INITIAL_SAMPLE_WORRIES: WorryItem[] = [
  {
    id: 'sample-1',
    title: '내일 발표 시간에 목소리가 떨릴까 봐 떨려요',
    content: '친구들 앞에서 국어 발표를 해야 하는데 가슴이 쿵쾅거리고 잘 못할까 봐 걱정돼요.',
    emotion: '불안해요',
    dollId: 'star',
    category: 'can_change',
    actionStep: '오늘 집에서 거울을 보고 소리 내어 2번 연습해보기',
    isActionCompleted: false,
    isRelieved: false,
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: 'sample-2',
    title: '내일 소풍날 비가 많이 올까 봐 걱정돼요',
    content: '소풍 가서 잔디밭에서 뛰어놀고 싶은데 일기예보에 비 소식이 있어서 속상해요.',
    emotion: '속상해요',
    dollId: 'sprout',
    category: 'cannot_change',
    isRelieved: true,
    relievedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export function loadWorries(): WorryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time seed
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_WORRIES));
      return INITIAL_SAMPLE_WORRIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load worries from localStorage:', err);
    return [];
  }
}

export function saveWorries(items: WorryItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save worries to localStorage:', err);
  }
}

export function addWorry(item: WorryItem): WorryItem[] {
  const current = loadWorries();
  const updated = [item, ...current];
  saveWorries(updated);
  return updated;
}

export function toggleActionStep(id: string): WorryItem[] {
  const current = loadWorries();
  const updated = current.map((item) => {
    if (item.id === id) {
      const nextCompleted = !item.isActionCompleted;
      return {
        ...item,
        isActionCompleted: nextCompleted,
        actionCompletedAt: nextCompleted ? new Date().toISOString() : undefined,
      };
    }
    return item;
  });
  saveWorries(updated);
  return updated;
}

export function toggleRelieved(id: string): WorryItem[] {
  const current = loadWorries();
  const updated = current.map((item) => {
    if (item.id === id) {
      const nextRelieved = !item.isRelieved;
      return {
        ...item,
        isRelieved: nextRelieved,
        relievedAt: nextRelieved ? new Date().toISOString() : undefined,
      };
    }
    return item;
  });
  saveWorries(updated);
  return updated;
}

export function deleteWorry(id: string): WorryItem[] {
  const current = loadWorries();
  const updated = current.filter((item) => item.id !== id);
  saveWorries(updated);
  return updated;
}

export function clearAllWorries(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}
