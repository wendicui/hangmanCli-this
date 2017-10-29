var list = ['shweh']
var array = list[0].split("")
var inquirer = require('inquirer')
var num = 0;

var questions = [
	{	
		name:'guess',
		type:'input',
		message: 'what do you guess'
	}
	]
function play(){
	if(num < 4){
		inquirer.prompt(questions).then(function(response){
			check(response.guess)
			console.log('check')
			num ++;
			play()
		})
		}
}


function check(y){
	console.log(array)
	var indexes = array.reduce(function(a,v,i){
		if (v === y){ 
			a.push(i);
			array.splice(i,1)
		};
	
		return a
	},[])
	console.log(array)

}
play()