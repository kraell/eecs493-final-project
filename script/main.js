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
  props: ['teamnum', 'playerErr', 'nameErr'],
  watch: {
    playerErr: function(newVal) {
      this.pErr = newVal
    },
    nameErr: function(newVal) {
      this.nErr = newVal
    }
  },
  data: function () {
    return {
      pErr: this.playerErr[this.teamnum],
      nErr: this.nameErr[this.teamnum],
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
            <div>
              <input type="text" v-model="name" v-on:keyup="emitName" class="introInput">
              <p v-show="nErr" class="inputError"> Please enter in a team name</p>
            </div>
          </div>
          <div class="introInputGroup">
            <h2 class="playersTitle introHeading">Players:</h2>
            <div class="players">
              <input type="text" v-for="(player, id) in players" v-model="player.name" v-on:keyup="emitPlayers" class="introInput my-1">
              <p v-show="pErr" class="inputError"> Please enter in at least two player names</p>
            </div>
          </div>
        </div>
    </div>
  `
})


Vue.component('score-board', {
  props: ['teamnum', 'name', 'playerObjs', 'score'],
  data: function () {
    return {

    }
  },

  template: `
    <div :id="'scoreboard' + teamnum" class="scoreboard" v-if="name" >
      <h2 class="teamName mb-5 introHeading">Team {{ name }}</h2>
      <h2 class="teamName mb-5 introHeading">Score: {{ score }}</h2>
      <div class="players">
        <div v-for="(player, id) in playerObjs">
          <h3><i><b>{{ player.name }}</b></i></h3>
          <p><b>Points:</b> {{ player.pointsScored }}</p>
          <p><b>Drunkenness:</b> {{ calculateLevel(player.alcConsumed) }}</p>
        </div>
      </div>
    </div>
  `,

  methods: {

    calculateLevel: function(numDrinks) {
      let level = ""
      if (numDrinks < 1) {
        level = "sober"
      } else if (numDrinks >= 1 && numDrinks < 2) {
        level = "buzzed"
      } else if (numDrinks >= 2 && numDrinks < 5) {
        level = "tipsy"
      } else if (numDrinks >= 5 && numDrinks < 8) {
        level = "drunk"
      } else {
        level = "please stop playing" // luuuul
      }
      return level
    }
  }
})

// TODO
Vue.component('battle-component', {
  props: ['team1players', 'team2players'],
  data: function () {
    let randomChoice = function (items) {
      return Math.floor(Math.random() * items.length)
    }

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
        team1: null,
        team2: null
      },
      currentGame: null,
      battlenum: 1,
    }
  },
  template: `
    <div :id="'battle' + battlenum" class="battle">

        <h1 class="mb-4"> Battle {{ battlenum }} </h1>

        <h2 class="mb-4"> {{ team1players[currentPlayers.team1] }} vs. {{ team2players[currentPlayers.team2] }} </h2>

        <h2 class="mb-4"> {{ games[currentGame].message }} </h2>

        <p> Click the winning player! </p>
        <button class="button" type="button" v-on:click="updateBattle(1, currentPlayers.team1)"> {{ team1players[currentPlayers.team1] }} </button>
        <button class="button" type="button" v-on:click="updateBattle(2, currentPlayers.team2)"> {{ team2players[currentPlayers.team2] }} </button>

    </div>
  `,
  methods: {

    updateBattle: function(winningTeam, player) {
      this.$emit('sendScore', this.currentGame, winningTeam, player)
      this.battlenum = this.battlenum + 1
      this.selectBattle()
    },

    randomChoice: function (items) {
      return Math.floor(Math.random() * items.length)
    },

    selectBattle: function() {
      this.currentPlayers.team1 = this.randomChoice(this.team1players)
      this.currentPlayers.team2 = this.randomChoice(this.team2players)
      this.currentGame = this.randomChoice(this.games)
    }

  },
  // Note: this function is not currently used.
  // Re: Called by Vue when the component is created
  created: function () {
    this.selectBattle()
  }
})

// TODO:wheel component
Vue.component('wheel-component', {
  props: ['loser'],
  data: function () {
    return {
      showNextButton: false,
      hideSpinButton: false,
      punishments: [
        {
          id: 0,
          punishment: 'Shotgun',
          angle:20,
        },
        {
          id: 1,
          punishment: 'Everyone takes a sip',
          angle:20,
        },
        {
          id: 2,
          punishment: '1 sip',
          angle:20,
        },
        {
          id: 3,
          punishment: 'Waterfall',
          angle:20,
        },
        {
          id: 4,
          punishment: 'Give out 3 sips',
          angle:20,
        },
        {
          id: 5,
          punishment: '1 sip upside down',
          angle:20,
        },
        {
          id: 6,
          punishment: 'SHOT',
          angle:20,
        },
        {
          id: 7,
          punishment: 'sip of water',
          angle:20,
        },
        {
          id: 8,
          punishment: 'CHUG',
          angle:20,
        },
        {
          id: 9,
          punishment: '5 sips',
          angle:20,
        },
        {
          id: 10,
          punishment: '2 sips',
          angle:20,
        },
        {
          id: 11,
          punishment: 'Truth or drink?', // haha this one is funny
          angle:20,
        }
      ],
      currentPunishment: {
        id: null,
        message: 'drink',
        value: 1
      },
    }
  },
  //<h2 class="mb-4"> {{ loser[team] }} lost! {{ loser[player] }}, spin the punishment wheel! </h2>
  template: `
    <div class="battle">

        <h1 class="mb-4"> Punishment Wheel </h1>
        <div>
          <div id="wheeldiv">
            <img src="img/wheel.png" alt="Drinking Punishment Prize Wheel" class="wheelImg">
          </div>
          <button  v-if="!hideSpinButton" class="button" type="button" v-on:click="spinWheel()"> Spin </button>
          <button v-if="showNextButton" class="button" type="button" v-on:click="sendPunishmentData()"> Next Battle </button>
        </div>

    </div>
  `,
  methods: {

    spinWheel() {
      let wheel = document.getElementById("wheeldiv")
      wheel.classList.add("rotate")
      let degrees = 10 //Math.floor((Math.random() * 360) + 360)    <- dont know why this doesnt work
      wheel.style.webkitTransform = "rotate("+ degrees +"deg)"
      console.log("ROTATE = " + wheel.style.webkitTransform)

      setTimeout(function() {
          wheel.classList.remove("rotate")
      }, 1000)
        
      console.log("spinnning wheel :)")
      this.showNextButton = true
      this.hideSpinButton = true
    },
      
    sendPunishmentData: function() {
      this.$emit('sendPunishmentData', this.currentPunishment, this.loser)
    },

    // randomChoice: function (items) {
    //   return Math.floor(Math.random() * items.length)
    // },

    // selectBattle: function() {
    //   this.currentPlayers.team1 = this.randomChoice(this.team1players)
    //   this.currentPlayers.team2 = this.randomChoice(this.team2players)
    //   this.currentGame = this.randomChoice(this.games)
    // }

  },
  // Note: this function is not currently used.
  // Re: Called by Vue when the component is created
  created: function () {
    // this.selectBattle()
  }
})


// parent component !!
var app = new Vue({
    el: '#toastedPeanuts',
    data: function () {
      return {
        gameStarted: false,
        showWheel: false,
        errorPlayers: {
          1: false,
          2: false
        },
        errorTeamName: {
          1: false,
          2: false
        },
        err: 0,
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
        },
        loserRound: null
      }
    },
    methods: {
        // Triggered when events are emitted by the children.
        nameSent (name, team) {
          this.errorTeamName[team] = false
          console.log(name)
          this.names[team] = name
        },
        teamInputsSent (playerNames, team) {
          this.errorPlayers[team] = false
          this.players[team] = playerNames.map(player => {
            return {
              name: player.name,
              pointsScored: 0,
              alcConsumed: 0,
            }
          });
        },

        updateScore (currentGame, team, player) {
            // Depending on what game was just played, give team <X> amount of points.
            console.log(currentGame);
            this.scores[team] += 10;
            console.log(player)
            this.players[team][player].pointsScored += 10
            console.log(this.players)

            //show the wheel
            this.showWheel = true
        },

        // TODO
        updateAlcLevel (punishment, loser) {
          console.log(punishment)
          this.showWheel = false
          //this.players[team][loser].alcConsumed += 1
        },

        validateGame() {
          if (this.players[1].length < 2) {
            console.log("not enough players")
            this.errorPlayers[1] = true
            console.log(this.errorPlayers)
          }
          if (this.players[2].length < 2) {
            console.log("not enough players")
            this.errorPlayers[2] = true
            console.log(this.errorPlayers)
          }

          if (this.names[1].length < 2) {
            console.log("no team name")
            this.errorTeamName[1] = true
            console.log(this.errorPlayers)
          }

          if(this.names[2].length < 2) {
            console.log("no team name")
            this.errorTeamName[2] = true
            console.log(this.errorPlayers)
          }

          // start the game if there are no errors
          if (!this.errorPlayers[1] && !this.errorTeamName[1] && !this.errorPlayers[2] && !this.errorTeamName[2]) {
            this.gameStarted = true
          }
        },

    },
    template: `
      <div class="gamescreen">

            <div class="teamInputs" v-show="!gameStarted">
              <team-input teamnum="1" :playerErr="errorPlayers[1]" :nameErr="errorTeamName[1]" v-on:sendPlayers="teamInputsSent" v-on:sendName="nameSent"></team-input>
              <div id="verticalline"></div>
              <team-input teamnum="2" :playerErr="errorPlayers[2]" :nameErr="errorTeamName[2]" v-on:sendPlayers="teamInputsSent" v-on:sendName="nameSent"></team-input>
            </div>

            <div id="playbutton" v-show="!gameStarted">
              <button class="button" type="button" v-on:click="validateGame"> P L A Y </button>
            </div>

            <div v-if="gameStarted">
              <score-board teamnum="1" :name="names[1]" :playerObjs="players[1]" :score="scores[1]"></score-board>
              <score-board teamnum="2" :name="names[2]" :playerObjs="players[2]" :score="scores[2]"></score-board>

              <battle-component v-if="gameStarted && !showWheel" :team1players="players[1].map(player => player.name)" :team2players="players[2].map(player => player.name)" v-on:sendScore="updateScore" ></battle-component>
                        
              <wheel-component v-if="gameStarted && showWheel" :loser="loserRound" v-on:sendPunishmentData="updateAlcLevel"></wheel-component>
            </div>

      </div>
    `
})
