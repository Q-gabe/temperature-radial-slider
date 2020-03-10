import React, { Component } from 'react'
import 'components/Debug/CurrentTempControl.css'

/**
 * [DEBUG CLASS]
 * This component maintains a callback to the main TemperatureRadialSlider component to manipulate
 * the current temperature for debugging purposes. In deployment in the future, the API exposed on
 * the TemperatureRadialSlider should be used instead.
 */
export class CurrentTempControl extends Component {
    constructor(props) {
        super(props);
        this.onChangeCurrTemperature = this.onChangeCurrTemperature.bind(this);
    }

    onChangeCurrTemperature(e) {
        this.props.handleChangeCurrTemp(e.target.value);
    }

    render() {
        const currTemp = this.props.currTemp;

        return (
            <div className="CurrentTempControl">
                Set Current Temperature &nbsp;
                <input id="debugTempBox" className="currTempBox" type="number" pattern="[0-9]{10}" min="32" max="100" size="3" value={currTemp} onChange={this.onChangeCurrTemperature}/>
                <input id="debugTempSlider" className="currTempSlider" type="range" min="32" max="100" value={currTemp} onChange={this.onChangeCurrTemperature} />
            </div>
        )
    }
}

export default CurrentTempControl
