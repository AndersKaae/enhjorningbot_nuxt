<script setup>
  const show_login_modal = ref(false);

  const handleLoginModalVisibility = (newValue) => {
  show_login_modal.value = newValue;
}

const emits = defineEmits(['loginClick']);

const emitLoginClick = () => {
  emits('loginClick', true); 
}
</script>

<template>
  <header class="site-header">
    <a href="/" class="site-logo" title="To the frontpage"><span class="emoji">🦄</span>Enhjørning.bot<span
                                                                 class="beta">beta</span></a>
      <NavbarMenu @loginClick="handleLoginModalVisibility"></NavbarMenu>
      <div class="nav-buttons-container">
        <div>
          <a href="/" class="nav-button"><img class="nav-img" src="/startup.png"> Companies</a>
        </div>
        <div>
          <a href="/top_investors" class="nav-button"><img class="nav-img" src="/angel-investor.png">Top 100 Investors</a>
        </div>
      </div>
      <div class="search-container">
        <NavbarSearchBox></NavbarSearchBox>
      </div>
      <div class="login-container">
      </div>
  </header>
</template>

<style scoped>
.nav-button {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit; 
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s; 
}
.nav-buttons-container {
  display: flex;
  justify-content: flex-start; 
  gap: 20px; 
}
.nav-img {
  width: 30px;
  margin-right: 10px;
  /*filter: grayscale(100%);*/
  filter: saturate(100%);
}

.search-container {
  order: 2;
}

.login-container {
  order: 3;
}

.site-header {
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 1.25rem;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
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
}
.burgermenu {
  display: none;
}

          @media (max-width: 640px) {
            .login-container {
              display: none;
            }
            .header-nav {
              margin-bottom: 1rem;
              order: 1;
              padding: 0;
            }

            .site-header {
              flex-direction: column; /* Keeps elements vertically stacked */
              align-items: flex-start; /* Aligns items to the start (left) */
              padding: 1rem; /* Adjust padding as needed */
              position: relative; /* Ensures relative positioning for absolute children */
            }

            .burgermenu {
              display: flex; /* Show the burger menu */
              position: absolute; /* Absolute positioning relative to the site-header */
              right: 10px; /* Aligns the burger menu to the right */
              top: 10px; /* Positions at the top, aligned with the logo */
              font-size: 1.5rem; /* Adjust the size of the burger menu */
            }

            .site-logo {
              align-self: flex-start; /* Aligns the logo to the left */
              margin-bottom: 1rem; /* Space between logo and search bar */
            }

            .search-container {
              order: 3; /* Positions the search bar below the logo and burger menu */
              width: 80%; /* Sets the width of the search bar */
              margin: 0 auto; /* Centers the search bar horizontally */
              display: block; /* Ensures the search container is displayed */
            }

            /* Hide nav buttons and login container on mobile */
            .nav-buttons-container, .login-container {
              display: none;
            }

          }
</style>
