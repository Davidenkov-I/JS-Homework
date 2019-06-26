// ЗАДАНИЕ 4/5

function Animal(name) {
    foodAmount = 50;

	var self = this;

    function formatFoodAmount() {
        return foodAmount + 'гр.';
    }

    this.dailyNorm = function(amount) {
        if (!arguments.length) return formatFoodAmount();

        if (amount < 50 || amount > 500) {
            return 'Недопустимое количество корма.';
        }

        foodAmount = amount;
    };

    this.name = name;

    this.feed = function() {
        console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
    };
}

function Cat(name) {
	Animal.apply(this, arguments);

	var animalFeed = this.feed;
	this.feed = function () {
        animalFeed();
        console.log('Котик доволен ^_^');
		return this;
    }

	this.stroke = function() {
		console.log('Гладим кота');
		return this;
    }
}

var barsik = new Cat('Барсик');

barsik.dailyNorm(550);
barsik.dailyNorm(500);
barsik.feed();
barsik.stroke();
barsik.feed().stroke().stroke().feed();