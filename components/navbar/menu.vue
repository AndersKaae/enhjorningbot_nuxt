<script setup>
const  modal = useModalStore()
const loginStore = useLoginStore()
const isMenuVisible = ref(false); // New ref for menu visibility

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value; // Toggle the menu visibility
}

const clickLogin = () => {
  modal.openModal(); // Open the login modal
  toggleMenu(); // Close the menu after clicking the login button
}


</script>

<template>  
  <!-- Added @click directive to toggle the menu -->
  <img class="burgermenu" src="/menu-burger.svg" @click="toggleMenu"/>
    <div class="menu" v-if="isMenuVisible">
      <div>
        <div v-if="loginStore.userName == null" class="login-button" @click="clickLogin"><img class="nav-img" src="/padlock.png">Login</div>
        <div v-else class="login-button" @click="clickLogout"><img class="nav-img" src="/padlock.png">Logout</div>
      </div>
      <div>
        <a href="/top_investors" class="nav-button"><img class="nav-img" src="/angel-investor.png">Top 100 Investors</a>
      </div>
      <div>
        <a href="/" class="nav-button"><img class="nav-img" src="/startup.png"> Companies</a>
      </div>
    </div>
</template>


<style scoped>
.burgermenu {
  display: none; /* Hide the burger menu by default */
}

  @media (max-width: 640px) {
    .burgermenu {
      display: flex; /* Show the burger menu */
      position: absolute; /* Absolute positioning relative to the site-header */
      right: 10px; /* Aligns the burger menu to the right */
      top: 10px; /* Positions at the top, aligned with the logo */
      font-size: 1.5rem; /* Adjust the size of the burger menu */
      z-index: 1050; /* Ensures it's above the menu */
      cursor: pointer; /* Indicates the icon is clickable */
      width: 30px;
    }

    .nav-img {
      width: 30px; /* Adjust the size of the icons */
      margin-right: 10px; /* Adds space between the image and the text */
      vertical-align: middle; /* Aligns the image vertically in line with the text */
    }

    .menu {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      position: absolute;
      top: 50px; /* Adjust based on the actual size of the burger menu */
      right: 10px;
      border: 1px solid #e2e2e2;
      padding: 10px;
      border-radius: 5px;
      width: auto; /* Adjust width as necessary */
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 1050; /* Ensures the menu is above other content */
      text-align: left; /* Aligns menu items to the left */
      width: 75%;
    }

    /* Increased padding for each menu item for better ergonomics */
    .menu > div, .menu > div > a {
      padding: 12px 0; /* Increases padding for better touch target size */
      display: flex; /* Ensures that the items align properly in a row */
      align-items: center; /* Centers items vertically within each menu item */
      text-decoration: none; /* Removes underline from links */
      color: #333; /* Sets the text color */
    }

    /* Adds a line between menu items and adjusts to not overlap with increased padding */
    .menu > div:not(:last-child) {
      border-bottom: 1px solid #e2e2e2; /* Creates a line between items */
    }
  }
</style>
