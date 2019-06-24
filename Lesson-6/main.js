// ЗАДАНИЕ №2

function Cat(name) {
	this.name = name;

	var foodAmount = 50; 

 	this.feed = function() {
		console.log('Насыпаем в миску ' + formatFoodAmount() + ' корма');
 	};

	function formatFoodAmount(){
		return foodAmount + 'гр.';
    }
}

var barsik = new Cat('Barsik');

barsik.feed();

// ЗАДАНИЕ №3

function Cat(name) {
	this.name = name;

	var foodAmount = 50;

 	this.feed = function() {
		console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма');
 	};

	function formatFoodAmount(){
		return foodAmount + 'гр.';
    }

	this.dailyNorm = function(amount) {
		if (!arguments.length) return formatFoodAmount();

		if (amount < 50) {
      		console.log('Насыпте больше корма');
    	}
    	if (amount > 500) {
      		console.log('А котик не треснет?');
    	}

    	foodAmount = amount;

    }
}

var barsik = new Cat('Barsik');