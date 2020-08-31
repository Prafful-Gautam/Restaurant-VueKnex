<template>
     <v-container class="my-5" v-if="!loading">
     <h1 class="text-center mb-5 text-decoration-underline">Food List</h1>
     <div class="text-center" v-if="loading">    
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
     </div>
 

     <v-layout row wrap v-if="!loading">
         <v-flex xs12 md3 v-for="food in foods" :key="food.id">
         <v-hover>
          <template v-slot="{hover}">
           <v-card
                class="mx-auto mb-5"
                max-width="400"
                :elevation="hover ? 24:1"
                v-for="food in foods" :key="food.id"
            >
                <v-img
                class="white--text align-up"
                height="200px"
                :src="food.imagePath"
                >
                <v-card-title class="text-uppercase">{{food.name}}</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0 text-uppercase font-weight-bold">{{food.name}}</v-card-subtitle>

                <v-card-text class="text--primary">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lorem ante, eleifend nec odio in, vulputate finibus nisl. Donec porttitor risus eu gravida pulvinar. Cras massa felis, faucibus vel velit eget, feugiat lacinia velit. Fusce eu augue erat. Nullam commodo mollis justo. Nullam elementum, mauris eu eleifend volutpat, eros diam luctus lacus, vitae euismod velit dolor dictum dui. Ut sit amet efficitur ante, eu ultricies ante. Aenean non tempus tortor, et pellentesque lorem.
                </div>

                <v-card-actions>
                 <v-btn color="error" @click="del(food.id)">Delete</v-btn>
                 </v-card-actions> 
                </v-card-text>

                <v-card-actions>
                <!-- <router-link :to="{name: 'restDetails', params: {id: rest.id}}">
                    View More
                </router-link> -->
               
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
    name:'FoodList',
   
    data () {
        return {
            foods: [{id:Number, restaurant_id: Number, name: String, imagePath: String}],
            loading: true
            }
    },
     props:{
        restId: Number,
    },
    methods:{
         del(id){
            axios.delete(`http://localhost:3000/foods/restaurant-foods/${id}`).then(res=>{
            console.log(res);
            this.foods = this.foods.filter(res => res.id !==id);
      })
    } 
    },
    mounted() {
        axios.get(`http://localhost:3000/foods/restaurant-foods?restId=${this.restId}`).then(res => {
            this.foods = res.data;
            this.loading = false;
        })
    }
    
    
}
</script>