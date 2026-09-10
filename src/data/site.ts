export const profile = {
  name: 'bliss',
  displayName: 'Bliss',
  role: 'product-minded developer',
  location: 'Seoul · KST',
  intro: 'Things I build. Notes I keep.',
  note: 'Exploring small ideas for the web.',
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
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
