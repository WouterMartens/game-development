/**
 * The NumberDisplay class represents a digital number display that can hold
 * values from zero to a given limit. The limit can be specified when creating
 * the display. The values range from zero (inclusive) to limit-1. If used,
 * for example, for the seconds on a digital clock, the limit would be 60, 
 * resulting in display values from 0 to 59. When incremented, the display 
 * automatically rolls over to zero when reaching the limit.
 * 
 * @author Michael Kölling and David J. Barnes and BugSlayer
 * @version 2019.11.14
 */
class NumberDisplay {
    private _limit: number;
    private _value: number;

    /**
     * Constructor for objects of class NumberDisplay.
     * 
     * @param {number} rollOverLimit the limit at which the display rolls over.
     */
    public constructor(rollOverLimit: number) {
        this._limit = rollOverLimit;
        this._value = 0;
    }

    /**
     * Return the current value.
     */
    public get value(): number {
        return this._value;
    }

    /**
     * Set the value of the display to the new specified value. If the new
     * value is less than zero or over the limit, do nothing.
     * 
     * @param {number} replacementValue the new value
     */
    public set value(replacementValue: number) {
        if((replacementValue >= 0) && (replacementValue < this._limit)) {
            this._value = replacementValue;
        }
    }

    /**
     * Return the display value (that is, the current value as a two-digit
     * String. If the value is less than ten, it will be padded with a leading
     * zero).
     */
    public get stringValue() : string {
        if(this._value < 10) {
            return "0" + this._value;
        }
        else {
            return "" + this._value;
        }
    }

    /**
     * Try to set the value of the display to the new specified value as a string.
     * The string value will be parsed to a number first.
     */
    public set stringValue(newValue: string) {
        this.value = Number(newValue);
    }

    /**
     * Increment the display value by one, rolling over to zero if the
     * limit is reached.
     */
    public increment() {
        this._value = (this._value + 1) % this._limit;
    }
}
