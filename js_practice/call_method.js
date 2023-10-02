'use strict';

const pizza = {
  name: 'Pizza',
  code: 'pizz',
  order(cname, id) {
    console.log(
      `Congo, ${cname}!!! Your order of ${this.name} with ID: ${
        this.code + id
      } is placed sucessfully!`
    );
  },
};
pizza.order('Rakesh', 11);

const pasta = {
  name: 'Pasta',
  code: 'pass',
};

const order = pizza.order;

order.call(pasta, 'Aron', 99);
order.call(pizza, 'Asma', 39);
