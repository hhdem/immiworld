<template>
  <article  class="markdown">
    <nuxt-content :document="doc"/>
  </article>
</template>
<script>
import MarkdownNavbar from 'markdown-navbar';
// The default style of markdown-navbar should be imported additionally
import 'markdown-navbar/dist/navbar.css';

  export default {
    layout: 'help',
    async asyncData({ $content, params, app }) {
      const doc = await $content(app.i18n.locale, 'help', params.slug).fetch()
      // console.info(doc);
      return { doc }
    }
  }
</script>