export const profile = {
  name: 'bliss',
  displayName: 'Bliss',
  role: 'product-minded developer',
  location: 'Seoul · KST',
  intro: '조용한 밤의 작업실에서 작은 제품과 읽을 만한 기록을 만듭니다.',
  note: '지금은 작은 웹 경험과 오래 남는 문장을 모으는 중이에요.',
  github: 'https://github.com/blissful-y0',
};

export const navItems = [
  { label: 'About me', href: '/' },
  { label: 'Blog', href: '/blog/' },
];

export const socialLinks = [
  { label: 'GitHub', href: profile.github, external: true },
];

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
