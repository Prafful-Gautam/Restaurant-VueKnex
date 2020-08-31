<template>
 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit="addRestaurant"
    class="fwidth"
  >
  <p v-if="errors.length">
      Please correct the following error(s):
      <ul>
          <li v-for="error in errors" :key=error>{{error}}</li>
      </ul>
  </p>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Select Type"
      required
    ></v-select>

    <v-select
      v-model="city"
      :items="cities"
      :rules="[v => !!v || 'Item is required']"
      label="Select City"
      required
    ></v-select>
  
    <v-btn color="success" type="submit">Submit</v-btn>
  </v-form>
</template>

<script>
import states from '../../city.json'; 
import axios from 'axios';

export default {
  name:'addRestaurant',
     data: () => ({
      errors: [],
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
    
      select: null,
      city: null,
      items: [
        'Veg', 'Non-Veg'
      ],
      cities: states.states,
       
    }),

    methods: {
      addRestaurant(e){
         

          if(this.name && this.select && this.city){
             console.log('validation----',this.validate());
             const rest = {name: this.name,type: this.select, city: this.city }
             axios.post(`http://localhost:3000/rest/restaurant`, rest).then(res => {
             console.log(res);
             this.reset();
             this.errors = [];
             this.$router.push({name:'Home'});
             return true;
          })  
          } 
          if(!this.name){
              this.errors.push('Restaurant name is required!')
           
          }
          if(!this.select){
              this.errors.push('Restaurant type is required!')
    
          }
          if(!this.city){
              this.errors.push('Restaurant city is required!')
         
          }   
           e.preventDefault();       
          
      },  
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
    
    },
  }
</script>

<style scoped>
.fwidth{
    width: 50%;
}
ul{
    color:red;
}
</style>