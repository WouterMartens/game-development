/**
 * The ClockDisplay class implements a digital clock display for a
 * European-style 24 hour clock. The clock shows hours, minutes and seconds. The 
 * range of the clock is 00:00:00 (midnight) to 23:59:59 (one second before 
 * midnight).
 * 
 * The clock display receives "ticks" (via the timeTick method) every second
 * and reacts by incrementing the display. This is done in the usual clock
 * fashion: the hour increments when the minutes roll over to zero and the
 * minute increments when the seconds roll over to zero.
 * 
 * @author Michael Kölling, David J. Barnes, BugSlayer and Wouter
 * @version 2019.11.14
 */
class ClockDisplay {

    // The HTMLElements for input and output
    private readonly _hoursInput: HTMLInputElement; 
    private readonly _minutesInput: HTMLInputElement;
    private readonly _secondsInput: HTMLInputElement;
    private readonly _output: HTMLElement; 

    private _hours : NumberDisplay;
    private _minutes : NumberDisplay;
    private _seconds: NumberDisplay;

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
        this._output = output;
        
        // Make sure that timeTick is called on the click event
        // Using an arrow function
        ticker.addEventListener("click", () => {
            this.timeTick();
        });

        this._hoursInput = hoursInput;
        this._minutesInput = minutesInput;
        this._secondsInput = secondsInput;
        setTime.addEventListener("click", () => {
            this.setTime();
        })
        // initialize all the data
        this._hours = new NumberDisplay(24);
        this._minutes = new NumberDisplay(60);
        this._seconds = new NumberDisplay(60);
        this.updateDisplay();
    }
    
    /**
     * This method should get called once every minute - it makes
     * the clock display go one minute forward.
     */
    public timeTick() {
        this._seconds.increment();
        if(this._seconds.value === 0) {
            this._minutes.increment();
            if(this._minutes.value == 0) {
                this._hours.increment();
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
        this._hours.stringValue = this._hoursInput.value;
        // Try to update the minutes value
        this._minutes.stringValue = this._minutesInput.value;
        // Try to update the seconds value
        this._seconds.stringValue = this._secondsInput.value;

        // Update the display
        this.updateDisplay();
    }

    /**
     * Update the display element in the DOM.
     */
    private updateDisplay() {
        const displayString = this._hours.stringValue + ":" + this._minutes.stringValue + ":" + this._seconds.stringValue;
        this._output.innerHTML = displayString;
    }

}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const clock = new ClockDisplay(
        <HTMLElement>document.getElementById('output'), 
        <HTMLButtonElement>document.getElementById("ticker"),
        <HTMLInputElement>document.getElementById("hoursInput"),
        <HTMLInputElement>document.getElementById("minutesInput"),
        <HTMLInputElement>document.getElementById("secondsInput"),
        <HTMLButtonElement>document.getElementById("setTime")
    );

    setInterval(clock.timeTick.bind(clock), 1000);
    
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', init);