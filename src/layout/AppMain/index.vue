<template>
  <div id="AppMain">

    <transition name="slide-fade">
      
        <router-view />
     
    </transition>

  </div>
</template>
<script>
export default {
  name: "AppMain"
};
</script>