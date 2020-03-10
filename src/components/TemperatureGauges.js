import React, { Component } from 'react'
import 'components/TemperatureGauges.css'

/**
 * This component shows the temperature gauges for the corresponding temperatures.
 */
export class TemperatureGauges extends Component {
    render() {
        const currTemp = this.props.currTemp;

        // Floored this because the meter in the Figure 1 in the
        // assignment does not show decimal places. 
        const setTemp = Math.floor(this.props.setTemp); 

        return (
            <div className="TemperatureGauges">
                <div className="SetTempGauge">
                    {setTemp}
                </div>
                <div className="CurrTempGauge">
                    Current: {currTemp}
                </div>
            </div>
        )
    }
}

export default TemperatureGauges
