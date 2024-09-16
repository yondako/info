---
layout: src/layouts/ArticleLayout.astro
isDraft: false
title: ニュースページを追加しました
thumbnail: /tmp.png
publishDate: 2024-09-16 00:00:00
---

この度、ニュースページを追加しました。これからは、新着情報やお知らせをこちらでお伝えしていきます。

## お知らせ

- 9月16日: ニュースページを追加しました
- 9月17日: お知らせを追加しました
- 9月18日: お知らせを追加しました

## 新着情報

- 9月16日: 新着情報を追加しました
- 9月17日: 新着情報を追加しました
- 9月18日: 新着情報を追加しました

| お知らせ                              | 新着情報                        |
| ------------------------------------- | ------------------------------- |
| 9月16日: ニュースページを追加しました | 9月16日: 新着情報を追加しました |
| 9月17日: お知らせを追加しました       | 9月17日: 新睩情報を追加しました |
| 9月18日: お知らせを追加しました       | 9月18日: 新着情報を追加しました |

```ts
// src/pages/add-news-page.ts
import { defineAstroComponent } from "vue";
import { BaseArticle } from "~/src/layouts/BaseArticle.astro";

export default defineAstroComponent({
  components: {
    BaseArticle
  }
});
```
