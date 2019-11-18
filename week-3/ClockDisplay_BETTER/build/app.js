class ClockDisplay {
    constructor(output, ticker, hoursInput, minutesInput, secondsInput, setTime) {
        this._output = output;
        ticker.addEventListener("click", () => {
            this.timeTick();
        });
        this._hoursInput = hoursInput;
        this._minutesInput = minutesInput;
        this._secondsInput = secondsInput;
        setTime.addEventListener("click", () => {
            this.setTime();
        });
        this._hours = new NumberDisplay(24);
        this._minutes = new NumberDisplay(60);
        this._seconds = new NumberDisplay(60);
        this.updateDisplay();
    }
    timeTick() {
        this._seconds.increment();
        if (this._seconds.value === 0) {
            this._minutes.increment();
            if (this._minutes.value == 0) {
                this._hours.increment();
            }
        }
        this.updateDisplay();
    }
    setTime() {
        this._hours.stringValue = this._hoursInput.value;
        this._minutes.stringValue = this._minutesInput.value;
        this._seconds.stringValue = this._secondsInput.value;
        this.updateDisplay();
    }
    updateDisplay() {
        const displayString = this._hours.stringValue + ":" + this._minutes.stringValue + ":" + this._seconds.stringValue;
        this._output.innerHTML = displayString;
    }
}
let init = function () {
    const clock = new ClockDisplay(document.getElementById('output'), document.getElementById("ticker"), document.getElementById("hoursInput"), document.getElementById("minutesInput"), document.getElementById("secondsInput"), document.getElementById("setTime"));
    setInterval(clock.timeTick.bind(clock), 1000);
};
window.addEventListener('load', init);
class NumberDisplay {
    constructor(rollOverLimit) {
        this._limit = rollOverLimit;
        this._value = 0;
    }
    get value() {
        return this._value;
    }
    set value(replacementValue) {
        if ((replacementValue >= 0) && (replacementValue < this._limit)) {
            this._value = replacementValue;
        }
    }
    get stringValue() {
        if (this._value < 10) {
            return "0" + this._value;
        }
        else {
            return "" + this._value;
        }
    }
    set stringValue(newValue) {
        this.value = Number(newValue);
    }
    increment() {
        this._value = (this._value + 1) % this._limit;
    }
}
//# sourceMappingURL=app.js.map