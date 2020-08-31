<template>
     <div style="width:100%">
        <h1 class="m-5 text-center">Restaurant Details</h1>
        <p></p>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{on, attrs}">
                 <v-card
                class="mx-auto mb-5"
                max-width="1000"
                height="auto"
               
                  >
                <v-img
                class="white--text align-up"
                height="200px"
                src="../../assets/rest.jpeg"
                >
                <v-card-title class="text-uppercase">{{restaurant.name}}</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0 text-uppercase font-weight-bold">{{restaurant.type}}</v-card-subtitle>

                <v-card-text class="text--primary">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lorem ante, eleifend nec odio in, vulputate finibus nisl. Donec porttitor risus eu gravida pulvinar. Cras massa felis, faucibus vel velit eget, feugiat lacinia velit. Fusce eu augue erat. Nullam commodo mollis justo. Nullam elementum, mauris eu eleifend volutpat, eros diam luctus lacus, vitae euismod velit dolor dictum dui. Ut sit amet efficitur ante, eu ultricies ante. Aenean non tempus tortor, et pellentesque lorem.
                </div>
             
              
                </v-card-text>

                <v-card-actions>
                    <v-btn color="secondary" @click="back()">Go Back</v-btn>
                    <v-spacer />
                    <v-btn color="primary" v-bind="attrs" v-on="on">Add Food</v-btn>
                </v-card-actions>
            </v-card>
        </template>
           
         <v-card>
        <v-card-title>
          <span class="headline">Add Food</span>
        </v-card-title>
        <v-card-text>
          <v-container>
          <v-row>
              <v-col cols="12">
                <v-text-field label="Food name*" v-model="name" required></v-text-field>
              </v-col>
            
              <v-col cols="12" md="6">
                <v-text-field label="Select Image*" @click="pickFile" v-model="imageName" prepend-icon='attach_file'></v-text-field>
              </v-col>
             >
             <v-col cols="12" md="4">
                 <img :src="imageUrl" height="150" v-if="imageUrl"/>
             </v-col>
                <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
            
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addFood">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>   
        </v-row>
     
    <!-- ---------------------------food items---------------- -->
     <div class="text-center mt-5" v-if="loading">    
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
     </div>
 
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
     </div>
</template>

<script>
 import * as axios from 'axios';

export default {
    name:'RestaurantDetails',
    data () {
        return {
            restaurant: {name:'', type:'', id:null, city_id:null},
            foods: [{id:0, restaurant_id: 0, name: '', imagePath: ''}],
            dialog: false,
            loading: true,
            name: '',
            imageName:'', 
            imageUrl: '',
            imageFile: ''
            
        }
    },
   methods: {
       addFood(){
        //    this.$router.replace({name: 'foods', params: {id: restId}})
        console.log('-------->',this.imageName, this.imageFile);
        //const food = {name: this.name, imagePath: this.imageFile, restaurant_id: this.$route.params.id}
        const food = new FormData();
        food.append("name", this.name);
        food.append("image", this.imageFile, this.imageName);
        food.append("restaurant_id", this.$route.params.id); 
        console.log(food.getAll('image'));
        axios.post('http://localhost:3000/foods/restaurant-foods', food).then(res => {
            console.log(res);
            this.dialog = false;
            this.getFood();
        })
        .catch(err => console.log(err))
       },
         back(){
        this.$router.replace({name:'Home'})
    },
    pickFile() {
          this.$refs.image.click()
        },
    onFilePicked(e){
      const files = e.target.files
      if(files[0] !== undefined){
        this.imageName = files[0].name;
         if (this.imageName.lastIndexOf('.') <= 0) {
          return
      }
      const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
    }else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }    

    },
    getFood(){
         axios.get(`http://localhost:3000/foods/restaurant-foods?restId=${this.$route.params.id}`).then(res => {
           this.foods = res.data;
           console.log('foods===>',this.foods);
           this.loading = false;
          console.log(this.loading);
         })
    },
    del(id){
      axios.delete(`http://localhost:3000/foods/restaurant-foods/${id}`).then(res=>{
        console.log(res);
        this.foods = this.foods.filter(res => res.id !==id);
      })
    } 
    },
   
    mounted: function (){
      console.log('Hello from rest details', this.$route.params.id)
          
            axios.get(`http://localhost:3000/rest/get-restaurant/${this.$route.params.id}`).then(res => {
                 
                 this.restaurant = res.data[0]
                 console.log(this.restaurant);
              
         })
         .catch(err => console.log(err))
         .finally(()=> {this.loading = false;})

        this.getFood();
   
    },
  
  
}
</script>

<style scoped>
 
</style>