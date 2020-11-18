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
  props: ['teamnum'],
  data: function () {
    return {
      name: '',
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
    <div :id="'team' + teamnum">
        <div :id="'inputs' + teamnum" class="teamDetails">
          <h2 class="teamName mb-5 introHeading">Team {{ teamnum }}</h2>
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
        </div>
      <score-board :teamnum="teamnum" :name="name" :players="players" ></score-board>
    
    </div>
  `
})


Vue.component('score-board', {
  props: ['teamnum', 'name', 'players'],
  data: function () {
    return {
      score: 0,
    }
  },

  template: `
    <div :id="'scoreboard' + teamnum" class="scoreboard" v-if="name" >
      <h2 class="teamName mb-5 introHeading">Team {{ name }}</h2>
      <h2 class="teamName mb-5 introHeading">Score: {{ score }}</h2>
      <div class="introInputGroup">
        <h2 class="playersTitle introHeading">Players:</h2>
        <br>
        <div class="players">
          <div v-for="(player, id) in players" > {{ player.name }} </div>
        </div>
      </div>
    </div>
  `
})

// TODO
Vue.component('battle-component', {
  props: ['team1players', 'team2players'],
  data: function () {
    return {
      battlenum: 1,
      games: [
        {
          id: 0,
          message: 'ROCK PAPER SCISSORS',
        },
        {
          id: 1,
          message: 'THUMB WAR',
        },
        {
          id: 2,
          message: 'CONCENTRARION 64',
        },
        {
          id: 3,
          message: 'ARM WRESTLE',
        },
      ],
    }
  },
  template: `
    <div :id="'battle' + battlenum" class="battle" v-if="team1players" >
        
        <h1> Battle {{ battlenum }} </h1>
        <h2> {{ team1players[0].name }} vs. {{ team2players[0].name }} </h2>
        <h1> {{ games[0].message }} </h1>
        
    </div>
  `
})

// parent component !!
var app = new Vue({
    el: '#toastedPeanuts',
    data: function () {
      return {
        team1players: [],
        team2players: [],
      }
    },
    methods: {
        // Triggered when `childToParent` event is emitted by the child.
        team1InputsDone (players) {
          this.team1players = players
        },
        team2InputsDone (players) {
          this.team2players = players
        }
    },
    template: `
      <div class="gamescreen">
      
            <div class="teamInputs">
              <team-input teamnum="1"></team-input>

              <div id="verticalline"></div>

              <team-input teamnum="2"></team-input>
            </div>

            <div id="playbutton">
              <button class="button" type="button" onclick="startGame()"> P L A Y </button>
            </div>
    
    
      </div>
    `
})



function startGame(){
    document.getElementById("inputs1").style.display = "none";
    document.getElementById("inputs2").style.display = "none";
    document.getElementById("verticalline").style.display = "none";
    document.getElementById("playbutton").style.display = "none";
    
    document.getElementById("scoreboard1").style.display = "block";
    document.getElementById("scoreboard2").style.display = "block";
    
}
