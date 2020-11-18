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
  methods: {
    // Define the method that emits data to the parent as the first parameter to `$emit()`.
    // This is referenced in the <template> call in the parent. The second parameter is the payload.
    emitToParent (event) {
      this.$emit('childToParent', this.players)
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
              <input type="text" v-for="(player, id) in players" v-model="player.name" v-on:keyup="emitToParent" class="introInput my-1">
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
  props: ['battlenum', 'team1players', 'team2players'],
  data: function () {
    return {
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
    <div :id="'battle' + battlenum" class="battle">
        
        <h1> Battle {{ battlenum }} </h1>
    
        //TODO: Randomly pick players
        <h2> {{ team1players[0].name }} vs. {{ team2players[0].name }} </h2>
        
        //TODO: Randomly pick a game
        <h1> {{ games[0].message }} </h1>
        
    </div>
  `
})


// parent component !!
var app = new Vue({
    el: '#toastedPeanuts',
    data: function () {
      return {
        gameStarted: false,
        team1players: [],
        team2players: [],
      }
    },
    methods: {
        // Triggered when `childToParent` event is emitted by the child.
        team1InputsSent (players) {
          this.team1players = players
        },
        team2InputsSent (players) {
          this.team2players = players
        }
    },
    template: `
      <div class="gamescreen">
      
            <div class="teamInputs">
              <team-input teamnum="1" v-on:childToParent="team1InputsSent"></team-input>

              <div id="verticalline"></div>

              <team-input teamnum="2" v-on:childToParent="team2InputsSent"></team-input>
            </div>

            <div id="playbutton">
              <button class="button" type="button" onclick="startGame()" v-on:click="gameStarted = true"> P L A Y </button>
            </div>
    

            <battle-component v-if="gameStarted"  battlenum="1" :team1players="team1players" :team2players="team2players"></battle-component>
    
    
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
