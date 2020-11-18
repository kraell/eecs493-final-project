/*
 * University of Michigan
 * EECS 493, Fall 2020
 *
 * main.js
 * eecs493-final-project
 *
 * Copyright © 2020 Marina Caporuscio, Juliet Carpenter, Keegan Elliott, Milan Gupta. All rights reserved.
 */

// TODO: Create components here above the Vue app



Vue.component('team-input', {
  props: ['team'],
  data: function () {
    return {
      name: '',
      score: 0,
      players: [
        {
          id: 0,
          name: '',
        },
        {
          id: 1,
          name: '',
        },
        {
          id: 2,
          name: '',
        },
        {
          id: 3,
          name: '',
        },
        {
          id: 4,
          name: '',
        },
      ],
    }
  },

  template: `
    <div :id="'team' + team" class="teamDetails">
      
    
      <h2 class="teamName mb-5 introHeading">Team {{ team }}</h2>
      <div class="introInputGroup mb-5">
        <h2 class="teamNameTitle introHeading">Name:</h2>
        <input type="text" v-model="name" class="introInput">
      </div>
      <div class="introInputGroup">
        <h2 class="playersTitle introHeading">Players:</h2>
        <div class="players">
          <input type="text" v-for="(player, id) in players" v-model="player.name" class="introInput my-1">
        </div>
      </div>
              
      <div :id="'scoreboard' + team" class="scoreboard">
        <h2 class="teamName mb-5 introHeading">Team {{ name }}</h2>
        <div class="introInputGroup">
          <h2 class="playersTitle introHeading">Players:</h2>
          <br>
          <div class="players">
            <div v-for="(player, id) in players" > {{ player.name }} </div>
          </div>
        </div>
      </div>
    
    </div>
  `
})




var app = new Vue({
    el: '#toastedPeanuts',
    data: {
      
    }
})






// this doesnt work :/
function startGame(){
    //document.getElementById("setup").style.zIndex = "-100";
    document.getElementById("scoreboard1").style.display = "block";
    document.getElementById("scoreboard2").style.display = "block";
    //document.getElementById("gamescreen").style.zIndex = "100";
    
    //document.getElementById("team1").style.display = "none";
    //document.getElementById("team2").style.display = "none";
    
    
    
}
