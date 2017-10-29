var inquirer = require('inquirer')
var game = require('./chooseWord.js')
var word = require('./word.js')
var chosen 
var number 
var guessWord 
var chance 
var guessed = []
function hangman(){}

hangman.prototype.gameon = function(){
	var newround = new game();
	number = newround.number
	chosen = newround.chosen
	guessWord = new word(chosen)
	chance = guessWord.length()
	//console.log(chosen)
	this.show()
}

hangman.prototype.show = function show(){
	//console.log (guessWord.letterArray().join(" "))
	//console.log(chosen)
	var that = this
	if(number < chance){
		// console.log(this)
		// var that = this
		var questions = this.question();
		inquirer.prompt(questions).then(function(answer){
	//check if user inputed this before, so that people can not input the same correct letter to win
			 
			function checkBefore(){
				for (var i = 0; i < guessed.length; i++) {
					if(guessed[i] === answer.guess){
						return true
					}
				}
			}

			if(checkBefore()){ 
				console.log("you have typed this")
				number++;
				console.log(`You have ${chance - number} chances left`)
				that.show()
			}

			else{
				guessed.push(answer.guess)

				guessWord.checkLetter(answer.guess);
				number ++;
				
				if(guessWord.win != true){
					console.log(`You have ${chance - number} chances left`)
					that.show()
				}else{
					console.log(chosen)
					that.newgame()
				}
			}
		})
		

	}else{
	console.log("You lose")
	that.newgame();
}
}

hangman.prototype.question = function question() {
	var questions = [
		{	
			name:'guess',
			type:'input',
			message: guessWord.letterArray().join(" ")
		}
		]
		return questions
}

hangman.prototype.newgame = function newgame(){
	var that = this
	var questions = [
			{	
			name:'newGame',
			type:'confirm',
			message: `${chosen.split("").join(" ")} \n Do you want a new Game?`,
			default: false		
		}
	]

	inquirer.prompt(questions).then(function (answer){
		if(answer.newGame){
			console.log("new gaming")
			that.gameon();
			
		}
	})
}

var newGame = new hangman()
newGame.gameon()
//trial
