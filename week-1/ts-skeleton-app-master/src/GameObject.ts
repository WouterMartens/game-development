class GameObject {
    private _name: string;
    private _position: string;
    private _velocity: number;
    private _orientation: number;
    private _size: number;
    private _health: number;

    public constructor(name: string, position: string, velocity: number, orientation: number, size: number) {
        this._name = name;
        this._position = position;
        this._velocity = velocity;
        this._orientation = orientation;
        this._size = size;
        this._health = 100;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get position(): string {
        return this._position;
    }

    set position(position) {
        this._position = position;
    }

    get velocity(): number {
        return this._velocity;
    }

    set velocity(velocity) {
        this._velocity = velocity;
    }

    get orientation(): number {
        return this._orientation;
    }

    set orientation(orientation) {
        this._orientation = orientation;
    }

    get size(): number {
        return this._size;
    }

    set size(size) {
        this._size = size;
    }

    get health(): number {
        return this._health;
    }

    set health(health) {
        this._health = health;
    }
}

const asteroid = new GameObject('Asteroid', '0,0', 5, 120, 10);
console.log(asteroid.name, asteroid.health);