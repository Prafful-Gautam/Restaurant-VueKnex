<template>
  <v-app>
    <nav>
    <v-toolbar dark class="indigo">
         <v-app-bar-nav-icon @click.stop="drawer=!drawer"/>
         <v-toolbar-title>Restaurant</v-toolbar-title>  
    </v-toolbar>
    
    </nav>
    <v-main>
     <v-sheet height="auto" class="overflow-hidden indigo lighten-5" style="position: relative; height: 100%">
       <v-container style="height:auto">
         <v-row align="center" justify="center">
         
           <router-view></router-view>
           
         </v-row>
       </v-container>

       <v-navigation-drawer v-model="drawer" absolute tamporary>
         <v-list-item>
           <v-list-item-content>User</v-list-item-content>
         </v-list-item>
         <v-divider></v-divider>

         <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
           <v-list-item-icon>
             <v-icon>{{item.icon}}</v-icon>
           </v-list-item-icon>

           <v-list-item-content>
             <v-list-item-title>{{item.title}}</v-list-item-title>
           </v-list-item-content>
         </v-list-item>
         </v-list>
       </v-navigation-drawer>
     </v-sheet>
     </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  component:{
 
  },


  data: () => ({
    drawer: false,
    items: [
     { title: 'Home', icon: 'dashboard', link: '/'},
     { title: 'Add-Restaurant', icon: 'restaurant', link: '/add-restaurant'}
    ]
  }),
};
</script>


