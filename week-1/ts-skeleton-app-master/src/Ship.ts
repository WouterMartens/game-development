class Ship {
    private _name: string;
    private _colour: string;
    private _cannons: number;
    private _distanceTravelled: number;

    public constructor(name: string, colour: string, cannons: number) {
        this._name = name;
        this._colour = colour;
        this._cannons = cannons;
        this._distanceTravelled = 0;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get getColour(): string {
        return this._colour;
    }

    set setColor(colour: string) {
        this._colour = colour;
    }

    get getCannons(): number {
        return this._cannons;
    }

    set setCannons(cannons: number) {
        this._cannons = cannons;
    }

    get getDistranceTravelled(): number {
        return this._distanceTravelled;
    }

    private set setDistranceTravelled(distance: number) {
        this._distanceTravelled = distance;
    }

    private addDistrancetravelled(add: number) {
        this._distanceTravelled += add;
    }

    public shoot() {
        // new Bullet(x, y, velocity, width);
    }

    public move() {
        //this.addDistrancetravelled(1);
        //this.addDistrancetravelled(1);
        this.setDistranceTravelled = this.getDistranceTravelled + 1;
    }
}

const ship: Ship = new Ship('Destiny', 'black', 5);
ship.name = "hi";
console.log(ship.name);

for (let index = 0; index < 10; index++) {
    ship.move();
}

console.log(ship.getDistranceTravelled);