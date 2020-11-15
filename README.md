# eecs493-final-project (julcarp, kraell, milagu, mkcapor)
### Due: 05 December 2020, 11:59pm ET

## Overview
Final project for EECS 493 Fall 2020: A team-based drinking game where players battle one on one. Loser drinks!

## Project Proposal

For our project, we will be making an online drinking game. The game will consist of two teams, of ideally 2-4 players each. There will be three rounds. To start, players will input their names, team names, and which team they want to be on. For each round, our app will generate “battle” pairings equal to the number of people on each team (i.e. if there are 3 people on each team, we’ll generate 3 pairings). Then, each pairing of players will have to spin a battle wheel to decide which head to head game they will play. The players will then play the game, and have to select who won the game. The loser of each game will have to spin a punishment wheel, consisting of various drinking related punishments (take a shot, take a sip, etc.). The winning team of each battle will automatically be awarded a certain number of points for winning. In rounds two and three, points will be doubled and tripled respectively, and there will be a team punishment for the losing team at the end.

In terms of tools and technologies, we will use HTML, CSS, Bootstrap, and VueJS in order to control states and functionality. We will have components for each team, each player, the punishment and battle wheels, battles themselves, and the game as a whole. Our app will keep track of how many points each team has, the pairings for each round, and how much each player has drank. We will use this last piece of information to display player stats (total number of sips, shots, shotgunned beers etc.), award bonus points at the end to each team, and to adjust punishment wheel probabilities to award lesser punishments to players who have drank more, so that all players will have drank a similar amount by the end. 

Disclaimer: All of our team members are 21 years of age, and in order to promote healthy drinking habits, our interface will provide an everlasting link to the University of Michigan Stay in the Blue guidelines (https://uhs.umich.edu/stayintheblue).
