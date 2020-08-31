<template>
 <v-container class="my-5">
     <h1 class="text-center mb-5 text-decoration-underline">Restaurant List</h1>
     <div class="text-center" v-if="loading">    
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
     </div>
 

     <v-layout row wrap v-if="!loading">
         <v-flex xs12 md3 v-for="rest in restaurants" :key="rest.id">
         <v-hover>
          <template v-slot="{hover}">
           <v-card
                class="mx-auto mb-5"
                max-width="400"
                :elevation="hover ? 24:1"
            >
                <v-img
                class="white--text align-up"
                height="200px"
                src="../assets/rest.jpeg"
                >
                <v-card-title class="text-uppercase">{{rest.name}}</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0 text-uppercase font-weight-bold">{{rest.type}}</v-card-subtitle>

                <v-card-text class="text--primary">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lorem ante, eleifend nec odio in, vulputate finibus nisl. Donec porttitor risus eu gravida pulvinar. Cras massa felis, faucibus vel velit eget, feugiat lacinia velit. Fusce eu augue erat. Nullam commodo mollis justo. Nullam elementum, mauris eu eleifend volutpat, eros diam luctus lacus, vitae euismod velit dolor dictum dui. Ut sit amet efficitur ante, eu ultricies ante. Aenean non tempus tortor, et pellentesque lorem.
                </div>

              
                </v-card-text>

                <v-card-actions>
                <!-- <router-link :to="{name: 'restDetails', params: {id: rest.id}}">
                    View More
                </router-link> -->
                <v-btn color="primary" @click="view(rest.id)">View More</v-btn>
                </v-card-actions>
            </v-card>
          </template>
         </v-hover>
      
         </v-flex>
        
     </v-layout>
 </v-container>
 
</template>
<script>
import * as axios from 'axios';

export default {
    name:'restaurantList',
    data () {
        return {
            loading: true,
            restaurants: [],
            showRestDetails:false,
            id: 0
            }

    },
     
    methods: {
       view(restId){
           this.$router.replace({name: 'restDetails', params: {id: restId}})
       }
    },
     mounted (){
             axios.get('http://localhost:3000/rest/get-restaurants').then(res => {
                 
                 this.restaurants = res.data
                 console.log(this.restaurants);
              
         })
         .catch(err => console.log(err))
         .finally(()=> {this.loading = false;})
        }
 

}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
v-container {
    height: 100%;
}
</style>