<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  loaded: {
    type: Boolean
  },
})

const footerHeight = ref(0)

watch(
  () => props.loaded,
  (newVal) => {
    const footer = document.querySelector('.site-footer');
    if (newVal) {
      // If content is loaded, adjust the footer's style as needed
      footer.style.position = 'relative'; // Change to 'relative' or another value as needed
      footer.style.bottom = 'initial'; // Reset to default or another value as needed
    } else {
      // If content is not loaded, you can revert to the original fixed positioning
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
    }
  }
);

</script>

<template>
  <footer class="site-footer">
    <p>
      Made by
      <a
        href="https://twitter.com/oaktoade"
        title="Follow @oaktoade  on Twitter"
        target="_blank"
        >@oaktoade</a
      >
      &amp;
      <a
        href="https://twitter.com/farvig"
        title="Follow @favig  on Twitter"
        target="_blank"
        >@ƒarvig</a
      >
    </p>
    <p>Interested in access to our API? Shoot us a message.</p>
  </footer>
</template>

<style scoped>
  .site-footer{
    background: #337592;
    background: linear-gradient(
      135deg,
      #337592 0%,
      #7089ca 44%,
      #709fb3 100%
    );
    color: #f7f7f7;
    margin-top: auto;
    padding: 4rem;
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .site-footer p{
    max-width: 100%;
  }
  .site-footer a{
    color: #f7f7f7;
  }

  @media (max-width: 640px) {
    .site-footer{
      padding: 2rem 1rem;
    }
  }

</style>


