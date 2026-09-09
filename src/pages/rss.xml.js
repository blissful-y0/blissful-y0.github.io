import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

/** @param {import('astro').APIContext} context */
export async function GET(context) {
  const posts = (await getCollection('posts')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Bliss Journal',
    description: '작업과 배움의 과정을 천천히 기록하는 공간입니다.',
    site: context.site ?? 'https://blissful-y0.github.io',
    customData: '<language>ko</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
