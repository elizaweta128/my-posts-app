<script>

import {onBeforeUnmount, onMounted, ref} from "vue";

export default {
 setup() {
    const isScrolled = ref(false);
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 10;
    };
   onMounted(() => {
     window.addEventListener('scroll', handleScroll);
   })
   onBeforeUnmount(() => {
     window.removeEventListener('scroll', handleScroll);
   })
    return{
      isScrolled,
      handleScroll,
    }
  }
}
</script>

<template>
    <div class="navbar-wrapper" :class="{ scrolled: isScrolled }">
      <div class="navbar-container">
        <div class="navbar-content">

          <router-link to="/" class="navbar-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">

              <rect x="10" y="10" width="80" height="80" rx="12" fill="var(--color-primary)"/>


              <path d="M30,30 L60,30 L60,50 C60,60 50,60 50,50 L50,30"
                    fill="none" stroke="var(--color-white)" stroke-width="8" stroke-linecap="round"/>
              <line x1="30" y1="30" x2="30" y2="70"
                    stroke="var(--color-white)" stroke-width="8" stroke-linecap="round"/>


              <line x1="30" y1="60" x2="70" y2="60"
                    stroke="var(--color-accent)" stroke-width="4" stroke-linecap="round"/>
              <line x1="30" y1="70" x2="70" y2="70"
                    stroke="var(--color-accent)" stroke-width="4" stroke-linecap="round"/>
              <line x1="30" y1="80" x2="70" y2="80"
                    stroke="var(--color-accent)" stroke-width="4" stroke-linecap="round"/>
            </svg>
            <span class="logo-text"><strong>PostHub</strong></span>
          </router-link>

          <ul class="navbar-menu">
            <li>
              <router-link to="/posts" class="router-link">
                Пости
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="router-link">
                Про нас
              </router-link>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<style>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--color-white);
  box-shadow: var(--box-shadow);
  height: var(--navbar-height);
  transition: var(--transition);
  padding: 15px;
}

.navbar-wrapper.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 15px rgba(46, 26, 71, 0.1);
  opacity: 0.7;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
}

.navbar-logo {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 5px 0;
}

.navbar-logo svg {
  height: 30px;
  transition: var(--transition);
}

.navbar-logo:hover svg {
  transform: scale(1.05);
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  position: relative;
}

.router-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 5px 0;
  transition: var(--transition);
  position: relative;
}

.router-link:hover {
  color: var(--color-primary);
}

.router-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: var(--transition);
}

.router-link:hover::after {
  width: 100%;
}

.router-link-active {
  color: var(--color-primary);
  font-weight: 600;
}

.router-link-active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 15px;
  }

  .navbar-menu {
    gap: 15px;
  }

  .navbar-logo svg {
    height: 25px;
  }

  .router-link {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .navbar-content {
    justify-content: center;
  }


  .navbar-logo {
    padding: 10px 0;
  }

  .navbar-logo svg {
    height: 28px;
  }
}
</style>
