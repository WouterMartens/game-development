/**
 * Describes the class Car
 */
class Car {
    private brand: string;
    private model: string;
    private fuel: string;
    private speed: number;
    private mileage: number;

    constructor(brand: string, model: string, fuel: string, speed: number, mileage: number) {
        this.brand = brand;
        this.model = model;
        this.fuel = fuel;
        this.speed = speed;
        this.mileage = mileage;
    }

    public start() { };
    public drive() { };
    public break() { };
}

// Creates an instance (object) of the class Car
const volvo = new Car('Volvo', '240', 'Gasoline', 200, 12231);