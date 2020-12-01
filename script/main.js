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
    emitPlayers (event) {
      this.$emit('sendPlayers', this.players.filter(player => player.name !== ''))
    },
    emitName (event) {
      this.$emit('sendName', this.name)
    },
  },
  template: `
    <div :id="'team' + teamnum">
        <div :id="'inputs' + teamnum" class="teamDetails">
          <h2 class="teamName mb-5 introHeading">Team {{ teamnum }}</h2>
          <div class="introInputGroup mb-5">
            <h2 class="teamNameTitle introHeading">Name:</h2>
            <input type="text" v-model="name" v-on:keyup="emitName" class="introInput">
          </div>
          <div class="introInputGroup">
            <h2 class="playersTitle introHeading">Players:</h2>
            <div class="players">
              <input type="text" v-for="(player, id) in players" v-model="player.name" v-on:keyup="emitPlayers" class="introInput my-1">
            </div>
          </div>
        </div>
    </div>
  `
})


Vue.component('score-board', {
  props: ['teamnum', 'name', 'players', 'score'],
  data: function () {
    return {

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
          message: 'CONCENTRATION 64',
        },
        {
          id: 3,
          message: 'ARM WRESTLE',
        },
      ],
      currentPlayers: {
        team1: '',
        team2: ''
      },
      currentGame: ''
    }
  },
  template: `
    <div :id="'battle' + battlenum" class="battle">

        <h1 class="mb-4"> Battle {{ battlenum }} </h1>

        <h2 class="mb-4"> {{ currentPlayers.team1 }} vs. {{ currentPlayers.team2 }} </h2>

        <h2 class="mb-4"> {{ currentGame }} </h2>

        // TODO: Add points to scoreboard when user clicks winner
        <p> Click the winning player! </p>
        <button class="button" type="button" v-on:click="updateBattle(1)" v-on:click.left="emitScore1"> {{ currentPlayers.team1 }} </button>
        <button class="button" type="button" v-on:click="updateBattle(2)" v-on:click.left="emitScore2"> {{ currentPlayers.team2 }} </button>

    </div>
  `,
  methods: {
    randomChoice: function (items) {
      let index = Math.floor(Math.random() * items.length)
      return items[index]
    },

    // Maybe divvy out different scores for different battles?
    emitScore1 (event) {
        this.$emit('sendScore1', this.currentGame)
    },
    emitScore2 (event) {
        this.$emit('sendScore2', this.currentGame)
    },

    updateBattle: function(winningTeam) {
      this.battlenum = parseInt(this.battlenum) + 1
      this.currentPlayers.team1 = this.randomChoice(this.team1players).name
      this.currentPlayers.team2 = this.randomChoice(this.team2players).name
      this.currentGame = this.randomChoice(this.games).message
    }
  },
  // Note: this function is not currently used.
  created: function () {
    this.currentPlayers.team1 = this.randomChoice(this.team1players).name
    this.currentPlayers.team2 = this.randomChoice(this.team2players).name
    this.currentGame = this.randomChoice(this.games).message
  }
})


// parent component !!
var app = new Vue({
    el: '#toastedPeanuts',
    data: function () {
      return {
        gameStarted: false,
        name1: '',
        name2: '',
        team1players: [],
        team2players: [],
        score1: 0,
        score2: 0,
      }
    },
    methods: {
        // Triggered when events are emitted by the children.
        name1Sent (name) {
          console.log(name)
          this.name1 = name
        },
        name2Sent (name) {
          console.log(name)
          this.name2 = name
        },
        team1InputsSent (players) {
          this.team1players = players
        },
        team2InputsSent (players) {
          this.team2players = players
        },
        updateScore1 (currentGame) {
            // Depending on what game was just played, give team1 <X> amount of points.
            console.log(currentGame);
            this.score1 += 10;
            console.log(this.score1);
        },
        updateScore2 (currentGame) {
            // Depending on what game was just played, give team2 <X> amount of points.
            console.log(currentGame);
            this.score2 += 10;
            console.log(this.score2);
        }
    },
    template: `
      <div class="gamescreen">

            <div class="teamInputs" v-show="!gameStarted">
              <team-input teamnum="1" v-on:sendPlayers="team1InputsSent" v-on:sendName="name1Sent"></team-input>
              <div id="verticalline"></div>
              <team-input teamnum="2" v-on:sendPlayers="team2InputsSent" v-on:sendName="name2Sent"></team-input>
            </div>

            <div id="playbutton" v-show="!gameStarted">
              <button class="button" type="button" v-on:click="gameStarted = true"> P L A Y </button>
            </div>

            <div v-show="gameStarted">
              <score-board teamnum="1" :name="name1" :players="team1players" :score="score1"></score-board>
              <score-board teamnum="2" :name="name2" :players="team2players" :score="score2"></score-board>

              <battle-component v-if="gameStarted" battlenum="1" :team1players="team1players" :team2players="team2players" v-on:sendScore1="updateScore1" v-on:sendScore2="updateScore2"></battle-component>
            </div>

      </div>
    `
})
