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
  props: ['team1players', 'team2players', 'round', 'battle'],
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
        },
        {
          id: 6,
          message: 'SLAPS'
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
    <div :id="'battle' + round" class="battle">

        <h1 class="mb-4"> Round {{ round }}, Battle {{ battle }} </h1>

        <h2 class="mb-4"> {{ team1players[currentPlayers.team1] }} vs. {{ team2players[currentPlayers.team2] }} </h2>

        <h2 class="mb-4"> {{ games[currentGame].message }} </h2>

        <p> Click the winning player! </p>
        <button class="button" type="button" v-on:click="updateBattle(1, currentPlayers.team1, currentPlayers.team2)"> {{ team1players[currentPlayers.team1] }} </button>
        <button class="button" type="button" v-on:click="updateBattle(2, currentPlayers.team2, currentPlayers.team2)"> {{ team2players[currentPlayers.team2] }} </button>

    </div>
  `,
  methods: {

    updateBattle: function(winningTeam, playerW, playerL) {
      console.log("updateBattle")
      console.log(playerW)
      console.log(playerL)
      console.log("end updateBattle")
      let loserTeam = winningTeam === 1? 2:1
      let loser = {"player": playerL, "team": loserTeam}
      this.$emit('sendScore', this.currentGame, winningTeam, playerW, loser)
      //this.battlenum = this.battlenum + 1
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
          punishment: 'shotgun!',
          angle: 7.5,
          alcLevel: 1.0,
          teamLevel: 0,
        },
        {
          id: 1,
          punishment: 'everyone takes a sip, but you take 2!',
          angle:340,
          alcLevel: .2,
          teamLevel: .1,
        },
        {
          id: 2,
          punishment: 'take 1 sip',
          angle: 307.5,
          alcLevel: .1,
          teamLevel: 0,
        },
        {
          id: 3,
          punishment: 'waterfall, you are last!',
          angle:280.5,
          alcLevel: .6,
          teamLevel: .4,
        },
        {
          id: 4,
          punishment: 'give out 3 sips and take 3 sips',
          angle:244.75,
          alcLevel: .3,
          teamLevel: .1,
        },
        {
          id: 5,
          punishment: 'take 1 sip upside down',
          angle: 209.25,
          alcLevel: .1,
          teamLevel: 0,
        },
        {
          id: 6,
          punishment: 'take a shot!',
          angle: 187.5,
          alcLevel: 1.0,
          teamLevel: 0,
        },
        {
          id: 7,
          punishment: 'take a sip of water',
          angle: 160.5,
          alcLevel: 0,
          teamLevel: 0,
        },
        {
          id: 8,
          punishment: 'CHUG!',
          angle: 123.5,
          alcLevel: .5,
          teamLevel: 0,
        },
        {
          id: 9,
          punishment: 'take 5 sips',
          angle:100.5,
          alcLevel: .5,
          teamLevel: 0,
        },
        {
          id: 10,
          punishment: 'take 2 sips',
          angle:65,
          alcLevel: .2,
          teamLevel: 0,
        },
        {
          id: 11,
          punishment: 'truth or drink?', // haha this one is funny
          angle:29.5,
          alcLevel: .1,
          teamLevel: 0,
        }
      ],
      currentPunishment: null
    }
  },
  //<h2 class="mb-4"> {{ loser[team] }} lost! {{ loser[player] }}, spin the punishment wheel! </h2>
  template: `
    <div class="battle">

        <h1 class="mb-4"> Punishment Wheel </h1>
        <div>

          <h2 id="changeText" class="mb-4"> Team {{ loser.teamName }} lost! {{ loser.player.name }}, spin the punishment wheel! </h2>

          <div id="wheel-buttons" class="mb-4">
            <button v-if="!hideSpinButton" id="spinButton" class="wheel-button button" type="button" v-on:click="spinWheel()"> Spin </button>
            <button v-if="showNextButton" id="nextButton" class="wheel-button button" type="button" v-on:click="sendPunishmentData()"> Next Battle </button>
          </div>
          <div id="wheelMarkerDiv">
            <div id="wheelMarker"></div>
          </div>


          <div id="wheeldiv">
            <img id="wheel" src="img/wheel.png" alt="Drinking Punishment Prize Wheel" class="wheelImg">
          </div>



        </div>

    </div>
  `,
  methods: {

    spinWheel() {
      this.selectPunishment()
      let wheel = document.getElementById("wheel")

      let id = this.currentPunishment.id
      console.log(id)
      wheel.classList.add("rotate" + id)
      console.log("spinnning wheel :)")
      let p = this.currentPunishment.punishment
      let loserName = this.loser.player.name
      let headerText = document.getElementById("changeText")
      setTimeout (function() {
        headerText.innerHTML =  loserName + ', ' + p
        headerText.style.fontWeight = "bold"
      }, 1000)
      this.showNextButton = true
      this.hideSpinButton = true
    },

    randomChoice: function (items) {
      return Math.floor(Math.random() * items.length)
    },

    sendPunishmentData: function() {
      let id = this.currentPunishment.id
      let wheel = document.getElementById("wheeldiv")
      wheel.classList.remove("rotate" + id)
      this.$emit('sendPunishmentData', this.currentPunishment)
    },

    selectPunishment: function() {
      this.currentPunishment = this.punishments[this.randomChoice(this.punishments)]
      console.log("curPunishment: ")
      console.log(this.currentPunishment)

    }

  },

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
        loserRound: {
          player: null,
          team: null,
          playerIndex: null,
          teamName: ""
        },
        curBattle: 1,
        curRound: 1,
        winner: "",
        showWinner: false
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

        updateScore (currentGame, team, playerW, playerL) {
            // Depending on what game was just played, give team <X> amount of points.
            console.log(currentGame);
            this.scores[team] += 10 * this.curRound;
            console.log(playerW)
            this.players[team][playerW].pointsScored += 10 * this.curRound
            console.log(this.players)

            this.loserRound.player = this.players[playerL.team][playerL.player]
            this.loserRound.playerIndex = playerL.player
            this.loserRound.team = playerL.team
            this.loserRound.teamName = this.names[playerL.team]

            //show the wheel
            this.showWheel = true
        },

        // TODO
        updateAlcLevel (punishment) {
          console.log("updateAlcLevel")
          console.log(punishment)
          let player = this.players[this.loserRound.team][this.loserRound.playerIndex]
          console.log(player.name)
          this.players[this.loserRound.team].forEach(player => {
            if (player.name === this.loserRound.player.name) {
              player.alcConsumed += punishment.alcLevel
            }
            else{
              player.alcConsumed += punishment.teamLevel
            }
          })
          console.log(player.alcConsumed)

          this.showWheel = false

          this.curBattle += 1

          if (this.curBattle > 10) {
            this.curRound += 1
            this.curBattle = 1
          }

          if (this.curRound > 3) {
            if (this.scores[1] > this.scores[2]) {
              this.winner = `TEAM ${this.names[1]} WINS!`
            } else if (this.scores[2] > this.scores[1]) {
              this.winner = `TEAM ${this.names[2]} WINS!`
            } else {
              this.winner = `IT'S A TIE!`
            }
            this.showWinner = true
          }

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

          if (this.names[1].length < 1) {
            console.log("no team name")
            this.errorTeamName[1] = true
            console.log(this.errorPlayers)
          }

          if(this.names[2].length < 1) {
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
      <div class="gamescreen container-fluid">

            <div class="teamInputs row" v-show="!gameStarted">
              <team-input teamnum="1" :playerErr="errorPlayers[1]" :nameErr="errorTeamName[1]" v-on:sendPlayers="teamInputsSent" v-on:sendName="nameSent" class="col-md-6"></team-input>
              <team-input teamnum="2" :playerErr="errorPlayers[2]" :nameErr="errorTeamName[2]" v-on:sendPlayers="teamInputsSent" v-on:sendName="nameSent" class="col-md-6"></team-input>
            </div>

            <div id="playbutton" v-show="!gameStarted" class="mt-5">
              <button class="button" type="button" v-on:click="validateGame"> P L A Y </button>
            </div>

            <div v-if="gameStarted" class="row">
              <score-board teamnum="1" :name="names[1]" :playerObjs="players[1]" :score="scores[1]" class="col-md-3"></score-board>


              <battle-component v-if="gameStarted && !showWheel && !showWinner" :team1players="players[1].map(player => player.name)" :team2players="players[2].map(player => player.name)" :round="curRound" :battle="curBattle" v-on:sendScore="updateScore" class="col-md-6"></battle-component>

              <wheel-component v-if="gameStarted && showWheel && !showWinner" :loser="loserRound" v-on:sendPunishmentData="updateAlcLevel" class="col-md-6"></wheel-component>

              <div class="winnerDiv col-md-6" v-if="showWinner">
                <h2 class="winner">{{this.winner}}</h2>

              </div>

              <score-board teamnum="2" :name="names[2]" :playerObjs="players[2]" :score="scores[2]" class="col-md-3"></score-board>

            </div>

      </div>
    `
})
