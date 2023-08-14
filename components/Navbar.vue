<script setup></script>

<template>
  <header class="site-header">
    <a href="/" class="site-logo" title="To the frontpage"
      ><span class="emoji">🦄</span>Enhjørning.bot<span class="beta"
        >beta</span
      ></a
    >
    <div class="search-container">
      <SearchBox></SearchBox>
    </div>
      <nav class="header-nav">
        <a href="https://twitter.com/enhjorningbot" title="Stay up to date on Twitter" target="_blank" class="follow-the-unicorn" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" ></path></svg></a >
        <a href="https://www.linkedin.com/company/52129046" title="Stay up to date on LinkeIn" target="_blank" class="follow-the-unicorn" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" > <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path></svg></a>
    </nav>
  </header>
</template>

<style scoped>
.search-container {
  order: 2;
}

.site-header {
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  margin-bottom: 20px;
  height: 80px;
}

.site-logo {
  color: #333;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  vertical-align: middle;
}

.emoji {
  display: inline-block;
  font-size: 2em;
  line-height: 1em;
  margin-right: 0.75rem;
  transition: transform 0.8s ease-in-out;
  vertical-align: middle;
}

.site-logo .beta {
  color: #888;
  font-size: 12px;
  margin-left: 5px;
  vertical-align: middle;
}

.header-nav {
  display: flex;
  order: 3;
  align-items: center;
}

.follow-the-unicorn {
  display: inline-block;
  padding-right: 10px;
  color: #333;
  text-decoration: none;
}

.follow-the-unicorn svg {
  fill: #333;
  width: 24px;
  height: 24px;
}

.header-nav {
  display: flex;
  padding-right: 2rem;
}

@media (max-width: 640px) {
  .header-nav {
    display: none;
  }
  .site-header {
    flex-direction: column;
    padding-left: 0rem;
  }

  .site-logo {
    margin-bottom: 1rem;
  }
}
</style>
