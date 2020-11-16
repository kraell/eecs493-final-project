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

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hidey Ho, Neighbor'
    }
})

var team1 = new Vue({
    el: '#team1',
    data: {
        name: '',
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: ''
    },
    methods: {
        playClicked(){

        }
    }
})


