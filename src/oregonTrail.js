class Traveler {
  constructor(name) {
    this.name = name;
    this._food = 1;
    this._isHealthy = true;
  }

  set food(food) {
    this._food = food;
  }

  get food() {
    return this._food;
  }

  set isHealthy(isHealthy) {
    this._isHealthy = isHealthy;
  }

  get isHealthy() {
   return this._isHealhy;
  }

  hunt = () => {
    this.food += 2;
  }

  eat = () => {
    if (this.food > 0) {
      this.food -= 1;
    } else if (this.food === 0) {
      this.isHealthy = false;
    }
  }
}

class Wagon {
  constructor(capacity) {
    this._capacity = capacity;
    this._passengers = [];
  }

  set capacity(seats) {
    this._capacity = seats;
  }

  get capacity() {
    return this._capacity;
  }

  set passengers(people) {
    this._passengers = people;
  }

  get passengers() {
    return this._passengers;
  }

  getAvailableSeatCount = () => {
    return this.capacity - this.passengers.length; 
  }

  join = (traveler) => {
    if (this.capacity - this.passengers.length > 0) {
      this.passengers.push(traveler);
    }
  }

  shouldQuarantine = () => {
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i]._isHealthy === false) {
        return true;
      }
    }
  }

  totalFood = () => {
    return this.passengers.reduce( (c, person) => c + person.food, 0);
  }
}

// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');
 
console.log(`${wagon.getAvailableSeatCount()} should be 2`);
 
wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);
 
wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);
 
henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)
 
console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);