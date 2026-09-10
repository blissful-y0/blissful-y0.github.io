---
title: 'A place for words to gather'
description: 'A sample build note about keeping Markdown posts and their metadata together as a blog grows.'
date: 2026-08-22
category: 'build log'
tags: ['astro', 'content']
readingTime: '5 min read'
featured: false
sample: true
---

## A durable home for posts

When starting a blog, getting one post on screen can feel like the main goal. As the collection grows, it becomes more important to keep titles, dates, and metadata from drifting into separate places.

The posts on this site are samples made from one Markdown file and its frontmatter. The body stays readable, while the information needed by the list stays at the top.

## Separate data from presentation

Content collections help keep the shape of each post consistent. A date that arrives as the wrong type or a missing field can be found while building.

```ts
const posts = (await getCollection('posts'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
```

The list focuses on titles and summaries, while the post page focuses on reading. The same data is reused in both places, so these samples can be replaced with real writing later.

## What comes next

With only a few posts, a small client-side filter can be enough. As the collection grows, a static search index can take over. The useful part is making the current flow clear first.
