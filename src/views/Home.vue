<template>
  <div style="width:100%">
    <restaurantList />
  </div>
</template>

<script>
// @ is an alias to /src
import restaurantList from '@/components/restaurant-list.vue'
export default {
  name: 'Home',
  components:{
    restaurantList
  }
 
}
</script>
