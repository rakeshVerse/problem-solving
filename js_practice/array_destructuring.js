const hotel = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterMenuIndex, mainMenuIndex) {
    return [this.starterMenu[starterMenuIndex], this.mainMenu[mainMenuIndex]];
  },
};

const [starter, mainCourse] = hotel.order(2, 2);
console.log(starter, mainCourse);
