<script setup>
  const show_login_modal = ref(false);

  const handleLoginModalVisibility = (newValue) => {
  console.log("Handling show-login-modal event with value:", newValue);
  show_login_modal.value = newValue;
}
</script>

<template>
  <header class="site-header">
    <a href="/" class="site-logo" title="To the frontpage"><span class="emoji">🦄</span>Enhjørning.bot<span
                                                                 class="beta">beta</span></a>
    <div class="nav-buttons-container">
      <div>
        <a href="/" class="nav-button"><img class="nav-img" src="/startup.png"> Companies</a>
      </div>
      <div>
        <a href="/top_investors" class="nav-button"><img class="nav-img" src="/angel-investor.png">Top 100 Investors</a>
      </div>
    </div>
    <div class="search-container">
      <SearchBox></SearchBox>
    </div>
    <div class="login-container">
      <LoginButton @update:show-login-modal="handleLoginModalVisibility"></LoginButton>
    </div>
  </header>
  <LoginModal @update:show-login-modal="handleLoginModalVisibility" :show_login_modal="show_login_modal"></LoginModal>
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
          flex-direction: column;
          padding: 1rem 0 0;
        }

        .site-logo {
          margin-bottom: 1rem;
        }

        .search-container {
          width: 80%;
        }
        .nav-buttons-container {
          justify-content: center;
          padding-top: 10px;
          padding-bottom: 20px;
        }
      }
</style>
