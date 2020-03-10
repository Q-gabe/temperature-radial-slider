/**
 * Business Object meant to store the dT, dTcool, dTheat variables.
 * Also holds the calculations for the 
 * */ 
export class Thermostat {
    constructor(Dt = 2, DtCool = 1.5 , DtHeat = 1) {
        this._Dt = Dt;
        this._DtCool = DtCool;
        this._DtHeat = DtHeat;

        this.idle_process = this.idle_process.bind(this);
        this.cooling_process = this.cooling_process.bind(this);
        this.heating_process = this.heating_process.bind(this);
    }
    
    // Determines if thermostat in the comfortable/idle state determines if it either
    // too hot, too cold, or within the comfort range.
    idle_process(currTemp, setTemp) {
        var highThreshold = setTemp + this._Dt + this._DtCool;
        var lowThreshold = setTemp - this._Dt - this._DtHeat;
        
        if (currTemp > highThreshold) {
            console.log("Thermostat: Surroundings too hot.")
            return "too_hot";
        } else if (currTemp < lowThreshold) {
            console.log("Thermostat: Surroundings too cold.")
            return "too_cold";
        } else {
            return "continue";
        }

    }

    // Determines if thermostat in cooling state determines if it is cold enough to be
    // back within the comfort range.
    cooling_process(currTemp, setTemp) {
        var coolEnough_thresholdToStop = setTemp + (this._Dt - this._DtCool);

        if (currTemp < coolEnough_thresholdToStop) {
            console.log("Thermostat: Surroundings cold enough now.")
            return "cold_enough"
        } else {
            return "continue"
        }
    }

    // Determines if thermostat in heating state determines if it is hot enough to be
    // back within the comfort range.
    heating_process(currTemp, setTemp) {
        var hotEnough_thresholdToStop = setTemp - (this._Dt - this._DtHeat);

        if (currTemp > hotEnough_thresholdToStop) {
            console.log("Thermostat: Surroundings hot enough now.")
            return "hot_enough"
        } else {
            return "continue"
        }
    }
}

export default Thermostat;