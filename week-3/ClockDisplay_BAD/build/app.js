class ClockDisplay {
    constructor(output, ticker, hoursInput, minutesInput, secondsInput, setTime) {
        this.output = output;
        ticker.addEventListener("click", () => {
            this.timeTick();
        });
        this.hoursInput = hoursInput;
        this.minutesInput = minutesInput;
        this.secondsInput = secondsInput;
        setTime.addEventListener("click", () => {
            this.setTime();
        });
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.updateDisplay();
    }
    timeTick() {
        this.seconds++;
        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes++;
            if (this.minutes >= 60) {
                this.minutes = 0;
                this.hours++;
                if (this.hours >= 24) {
                    this.hours = 0;
                }
            }
        }
        this.updateDisplay();
    }
    setTime() {
        const hoursString = this.hoursInput.value;
        const hoursNumber = Number(hoursString);
        if (hoursNumber >= 0 && hoursNumber < 24) {
            this.hours = hoursNumber;
        }
        const minutesString = this.minutesInput.value;
        const minutesNumber = Number(minutesString);
        if (minutesNumber >= 0 && minutesNumber < 60) {
            this.minutes = minutesNumber;
        }
        const secondsString = this.secondsInput.value;
        const secondsNumber = Number(secondsString);
        if (secondsNumber >= 0 && secondsNumber < 60) {
            this.seconds = secondsNumber;
        }
        this.updateDisplay();
    }
    updateDisplay() {
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
let init = function () {
    const clock = new ClockDisplay(document.getElementById('output'), document.getElementById("ticker"), document.getElementById("hoursInput"), document.getElementById("minutesInput"), document.getElementById('secondsInput'), document.getElementById("setTime"));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map