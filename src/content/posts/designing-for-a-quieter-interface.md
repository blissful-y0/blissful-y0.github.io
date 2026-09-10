---
title: 'A few choices for a quieter interface'
description: 'A sample note on leaving room for people to stay, instead of putting more into every screen.'
date: 2026-09-06
category: 'design note'
tags: ['design', 'interface']
readingTime: '4 min read'
featured: true
sample: true
---

## Space is not empty

When building an interface, space is often the first thing to remove. A fuller screen can look more useful and appear to do more at once. For the reader, though, space can be the short breath that makes the next action easier to choose.

This is a sample design note for the portfolio, not a report of product metrics or usability results. It is a starting point for thinking about what a small screen can leave out.

## Set the rhythm first

When every element arrives at the same size and speed, the eye has nowhere to settle. Different spacing for the title, description, and action lets the order of the information appear naturally.

These are a few small rules I return to:

- Keep the title only as large as it needs to be read in one pass.
- Let the description answer the next question, and stop there.
- Suggest one primary action on a screen.

These are less a set of answers than a small checklist for editing a screen down.

## Let motion stay small

Animation should live in the same rhythm. If every element jumps into view, it works against a quiet screen. Shorter distances and motion that responds to a choice help the page keep its mood.

```css
.quiet-link {
  transition: color 180ms ease, transform 180ms ease;
}

.quiet-link:hover {
  color: var(--amber);
  transform: translateX(3px);
}
```

Always check the reduced-motion setting at the end. A quiet screen should not ask everyone to experience the same movement.

## Leave a question behind

A good screen does not show every answer at once. It leaves a small curiosity to return to. As real work replaces these samples, I want to see how long this principle can stay useful.
