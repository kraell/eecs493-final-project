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
      this.$emit('sendPlayers', this.players.filter(player => player.name !== ''), this.teamnum)
    },
    emitName (event) {
      this.$emit('sendName', this.name, this.teamnum)
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
  props: ['teamnum', 'name', 'playerNames', 'score'],
  data: function () {
    console.log(this.playerNames)
    let playerObjs = this.playerNames.map(player => {
      return {
        name: player,
        pointsScored: 0,
        totalStandardDrinks: 0,
      }
    })
    return {
      players: playerObjs
    }
  },

  template: `
    <div :id="'scoreboard' + teamnum" class="scoreboard" v-if="name" >
      <h2 class="teamName mb-5 introHeading">Team {{ name }}</h2>
      <h2 class="teamName mb-5 introHeading">Score: {{ score }}</h2>
      <div class="players">
        <div v-for="(player, id) in players">
          <h3><i><b>{{ player.name }}</b></i></h3>
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
        {
          id: 4,
          message: 'NINJA'
        },
        {
          id: 5,
          message: 'STARING CONTEST'
        }
      ],
      currentPlayers: {
        team1: '',
        team2: ''
      },
      currentGame: '',
      battlenum: 1
    }
  },
  template: `
    <div :id="'battle' + battlenum" class="battle">

        <h1 class="mb-4"> Battle {{ battlenum }} </h1>

        <h2 class="mb-4"> {{ currentPlayers.team1 }} vs. {{ currentPlayers.team2 }} </h2>

        <h2 class="mb-4"> {{ currentGame }} </h2>

        <p> Click the winning player! </p>
        <button class="button" type="button" v-on:click="updateBattle(1)" v-on:click.left="emitScore($event, 1)"> {{ currentPlayers.team1 }} </button>
        <button class="button" type="button" v-on:click="updateBattle(2)" v-on:click.left="emitScore($event, 2)"> {{ currentPlayers.team2 }} </button>

    </div>
  `,
  methods: {
    randomChoice: function (items) {
      let index = Math.floor(Math.random() * items.length)
      return items[index]
    },

    // Maybe divvy out different scores for different battles?
    // Can we consolidate these two functions?
    emitScore (event, team) {
        this.$emit('sendScore', this.currentGame, team)
    },

    updateBattle: function(winningTeam) {
      this.battlenum = this.battlenum + 1
      this.currentPlayers.team1 = this.randomChoice(this.team1players)
      this.currentPlayers.team2 = this.randomChoice(this.team2players)
      this.currentGame = this.randomChoice(this.games).message
    }
  },
  // Note: this function is not currently used.
  // Re: Called by Vue when the component is created
  created: function () {
    this.currentPlayers.team1 = this.randomChoice(this.team1players)
    this.currentPlayers.team2 = this.randomChoice(this.team2players)
    this.currentGame = this.randomChoice(this.games).message
  }
})


// parent component !!
var app = new Vue({
    el: '#toastedPeanuts',
    data: function () {
      return {
        gameStarted: false,
        names: {
          1: '',
          2: ''
        },
        players: {
          1: [],
          2: []
        },
        scores: {
          1: 0,
          2: 0
        }
      }
    },
    methods: {
        // Triggered when events are emitted by the children.
        nameSent (name, team) {
          console.log(name)
          this.names[team] = name
        },
        teamInputsSent (playerNames, team) {
          this.players[team] = playerNames.map(player => player.name)
        },

        updateScore (currentGame, team) {
            // Depending on what game was just played, give team <X> amount of points.
            console.log(currentGame);
            this.scores[team] += 10;
        },

    },
    template: `
      <div class="gamescreen">

            <div class="teamInputs" v-show="!gameStarted">
              <team-input teamnum="1" v-on:sendPlayers="teamInputsSent" v-on:sendName="nameSent"></team-input>
              <div id="verticalline"></div>
              <team-input teamnum="2" v-on:sendPlayers="teamInputsSent" v-on:sendName="nameSent"></team-input>
            </div>

            <div id="playbutton" v-show="!gameStarted">
              <button class="button" type="button" v-on:click="gameStarted = true"> P L A Y </button>
            </div>

            <div v-if="gameStarted">
              <score-board teamnum="1" :name="names[1]" :playerNames="players[1]" :score="scores[1]"></score-board>
              <score-board teamnum="2" :name="names[2]" :playerNames="players[2]" :score="scores[2]"></score-board>

              <battle-component v-if="gameStarted" :team1players="players[1]" :team2players="players[2]" v-on:sendScore="updateScore"></battle-component>
            </div>

      </div>
    `
})
