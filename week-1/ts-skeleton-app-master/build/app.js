"use strict";
class GameObject {
    constructor(name, position, velocity, orientation, size) {
        this._name = name;
        this._position = position;
        this._velocity = velocity;
        this._orientation = orientation;
        this._size = size;
        this._health = 100;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
    }
    get velocity() {
        return this._velocity;
    }
    set velocity(velocity) {
        this._velocity = velocity;
    }
    get orientation() {
        return this._orientation;
    }
    set orientation(orientation) {
        this._orientation = orientation;
    }
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = size;
    }
    get health() {
        return this._health;
    }
    set health(health) {
        this._health = health;
    }
}
const asteroid = new GameObject('Asteroid', '0,0', 5, 120, 10);
console.log(asteroid.name, asteroid.health);
class Ship {
    constructor(name, colour, cannons) {
        this._name = name;
        this._colour = colour;
        this._cannons = cannons;
        this._distanceTravelled = 0;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get getColour() {
        return this._colour;
    }
    set setColor(colour) {
        this._colour = colour;
    }
    get getCannons() {
        return this._cannons;
    }
    set setCannons(cannons) {
        this._cannons = cannons;
    }
    get getDistranceTravelled() {
        return this._distanceTravelled;
    }
    set setDistranceTravelled(distance) {
        this._distanceTravelled = distance;
    }
    addDistrancetravelled(add) {
        this._distanceTravelled += add;
    }
    shoot() {
    }
    move() {
        this.setDistranceTravelled = this.getDistranceTravelled + 1;
    }
}
const ship = new Ship('Destiny', 'black', 5);
ship.name = "hi";
console.log(ship.name);
for (let index = 0; index < 10; index++) {
    ship.move();
}
console.log(ship.getDistranceTravelled);
//# sourceMappingURL=app.js.map