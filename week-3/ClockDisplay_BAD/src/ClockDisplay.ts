/**
 * The ClockDisplay class implements a digital clock display for a
 * European-style 24 hour clock. The clock shows hours, minutes and seconds. The 
 * range of the clock is 00:00:00 (midnight) to 23:59:59 (one minute before 
 * midnight).
 * 
 * The clock display receives "ticks" (via the timeTick method) every second
 * and reacts by incrementing the display. This is done in the usual clock
 * fashion: the hour increments when the minutes roll over to zero
 * and the minute increments when the seconds roll over to zero.
 * 
 * @author Michael Kölling, David J. Barnes, BugSlayer and Wouter
 * @version 2019.11.14
 */
class ClockDisplay {

    // The HTMLElements for input and output
    private readonly hoursInput: HTMLInputElement; 
    private readonly minutesInput: HTMLInputElement; 
    private readonly secondsInput: HTMLInputElement;
    private readonly output: HTMLElement; 

    private hours: number;
    private minutes: number;
    private seconds: number;

    /**
     * Construct clockdisplay
     * 
     * @param output 
     * @param ticker 
     */
    public constructor(output: HTMLElement, ticker: HTMLButtonElement, 
        hoursInput: HTMLInputElement, minutesInput: HTMLInputElement,
        secondsInput: HTMLInputElement, setTime: HTMLButtonElement) {
        // Construct all of the canvas
        this.output = output;
        
        // Make sure that timeTick is called on the click event
        // Using an arrow function
        ticker.addEventListener("click", () => {
            this.timeTick();
        });

        this.hoursInput = hoursInput;
        this.minutesInput = minutesInput;
        this.secondsInput = secondsInput;
        setTime.addEventListener("click", () => {
            this.setTime();
        })
        // initialize all the data
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.updateDisplay();
    }
    
    /**
     * This method should get called once every second - it makes
     * the clock display go one second forward.
     */
    public timeTick() {
        this.seconds++;
        if(this.seconds>=60) {
            this.seconds = 0;
            this.minutes++;
            if(this.minutes>=60) {
                this.minutes = 0;
                this.hours++;
                if(this.hours>=24) {
                    this.hours = 0;
                }
            }
        }
        this.updateDisplay();
    }

    /**
     * Set the time of the display to the specified hour and
     * minute.
     */
    public setTime() {
        // Try to update the hours value
        const hoursString = this.hoursInput.value;
        const hoursNumber = Number(hoursString);
        if (hoursNumber>=0 && hoursNumber<24) {
            this.hours = hoursNumber;
        }

        // Try to update the minutes value
        const minutesString = this.minutesInput.value;
        const minutesNumber = Number(minutesString);
        if (minutesNumber>=0 && minutesNumber<60) {
            this.minutes = minutesNumber;
        }

        // Try to update the seconds value
        const secondsString = this.secondsInput.value;
        const secondsNumber = Number(secondsString);
        if (secondsNumber>=0 && secondsNumber<60) {
            this.seconds = secondsNumber;
        }

        // Update the display
        this.updateDisplay();
    }

    /**
     * Update the display element in the DOM.
     */
    private updateDisplay() {
        let hoursString = `${this.hours}`;
        if (this.hours < 10) {
            hoursString = "0" + hoursString;
        } 
        let minutesString = `${this.minutes}`;
        if (this.minutes < 10) {
            minutesString = "0" + minutesString;
        }
        let secondsString = `${this.seconds}`;
        if (this.seconds < 10) {
            secondsString = "0" + secondsString;
        }
        const displayString = hoursString + ":" + minutesString + ":" + secondsString;
        this.output.innerHTML = displayString;
    }

}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const clock = new ClockDisplay(
        <HTMLElement>document.getElementById('output'), 
        <HTMLButtonElement>document.getElementById("ticker"),
        <HTMLInputElement>document.getElementById("hoursInput"),
        <HTMLInputElement>document.getElementById("minutesInput"),
        <HTMLInputElement>document.getElementById('secondsInput'),
        <HTMLButtonElement>document.getElementById("setTime")
    );
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', init);