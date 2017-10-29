var inquirer = require('inquirer')
var game = require('./chooseWord.js')
var word = require('./word.js')


function hangman(){

}

hangman.prototype.gameon = function(){
	var newround = new game();
	this.number = newround.number
	this.chosen = newround.chosen
	this.guessWord = new word(this.chosen)
	this.chance = this.guessWord.length()
	this.guessed = []
	//console.log(chosen)
	this.show()
}

hangman.prototype.show = function show(){
	//console.log (guessWord.letterArray().join(" "))
	//console.log(chosen)
	var that = this
	if(this.number < that.chance){
		// console.log(this)
		// var that = this
		var questions = that.question();
		inquirer.prompt(questions).then(function(answer){
	//check if user inputed this before, so that people can not input the same correct letter to win
			 
			function checkBefore(){
				for (var i = 0; i < that.guessed.length; i++) {
					if(that.guessed[i] === answer.guess){
						return true
					}
				}
			}

			if(checkBefore()){ 
				console.log("you have typed this")
				that.number++;
				console.log(`You have ${that.chance - that.number} chances left`)
				that.show()
			}

			else{
				that.guessed.push(answer.guess)

				that.guessWord.checkLetter(answer.guess);
				this.number ++;
				
				if(that.guessWord.win != true){
					console.log(`You have ${that.chance - that.number} chances left`)
					that.show()
				}else{
					console.log(that.chosen)
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
			message: this.guessWord.letterArray().join(" ")
		}
		]
		return questions
}

hangman.prototype.newgame = function newgame(){
	var that  = this;
	var questions = [
			{	
			name:'newGame',
			type:'confirm',
			message: `${this.chosen.split("").join(" ")} \n Do you want a new Game?`,
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

module.exports = hangman
// var newGame = new hangman()
// newGame.gameon()
//trial
