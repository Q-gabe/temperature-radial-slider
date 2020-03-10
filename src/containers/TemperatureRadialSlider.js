import React, { Component } from 'react'
import { interpret } from 'xstate';
import { modeMachine } from 'data/ModeMachine' 
import { ReactComponent as Background } from 'images/ThermostatBG.svg'
import { ReactComponent as SunIcon } from 'images/SunIcon.svg'

import 'containers/TemperatureRadialSlider.css'
import CurrentTempControl from 'components/Debug/CurrentTempControl'
import Face from 'components/Face.js'
import TemperatureGauges from 'components/TemperatureGauges'
import RadialSlider from 'components/RadialSlider/RadialSlider'
import Thermostat from 'data/Thermostat'

/**
 * Temperature Radial Slider Component with Debugging Slider:
 * 
 * This is the entire contained custom component, if there were to be further
 * extensibility options for this slider, they would be implemented here. (eg.
 * no debugging etc.)
 */
export class TemperatureRadialSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currTemperature: 72,
            setTemperature: 72,
            current: modeMachine.initialState
        }

        this.handleChangeCurrTemp = this.handleChangeCurrTemp.bind(this);
        this.handleChangeSetTemp = this.handleChangeSetTemp.bind(this);
        this.thermostatCheck = this.thermostatCheck.bind(this);
    }

    /*
     *  State Management using XState 
     */
    service = interpret(modeMachine).onTransition(current =>
        this.setState({ current })
    );

    thermostat = new Thermostat(); // Temperature Settings and Threshold checks

    componentDidMount() {
        this.service.start();
    }

    componentWillUnmount() {
        this.service.stop();
    }

    // Calls the thermostat check on temperature decision. Depending on response,
    // this method dispatches state changes to the state machine.
    thermostatCheck() {
        var result;
        if (this.state.current.matches('cooling')) {
            result = this.thermostat.cooling_process(
                this.state.currTemperature,
                this.state.setTemperature);
        } else if (this.state.current.matches('heating')) {
            result = this.thermostat.heating_process(
                this.state.currTemperature,
                this.state.setTemperature);
        } else {
            result = this.thermostat.idle_process(
                this.state.currTemperature,
                this.state.setTemperature
            );
        }

        switch (result) {
            case "too_hot":
                this.service.send('TEMP_TOO_HIGH')
                console.log("ModeMachine: Turning on A/C.")
                break;
            case 'too_cold':
                this.service.send('TEMP_TOO_LOW')
                console.log("ModeMachine: Turning on Heat.")
                break;
            case 'cold_enough':
            case 'hot_enough':
                this.service.send('TEMP_NORMALIZED')
                console.log("ModeMachine: Going idle.")
                break;
            case 'continue':
            default:
                // No state change.
        }
    }


    /*
    *  Temperature Handlers
    */
    // Changes current temperature state after bound checking. Notifies thermostat.
    handleChangeCurrTemp(value) {
        if (value >= 32 && value <= 100) {
            this.setState({
                currTemperature: value
            });
            this.thermostatCheck();
        }
    }

    // Changes target/set temperature state after bound checking. Notifies thermostat.
    handleChangeSetTemp(value) {
        if (value >= 50 && value <= 80) {
            this.setState({
                setTemperature: value
            });
            this.thermostatCheck();
        }
    }

    render() {
        const { current } = this.state; // state check for mode

        return (
            <div className="DemoEnvironment">
                <div className="TemperatureRadialSlider">
                    <Background />
                    <Face
                        mode = {current.value}
                        currTemp={this.state.currTemperature}
                        setTemp={this.state.setTemperature}
                    />
                    <TemperatureGauges
                        currTemp={this.state.currTemperature}
                        setTemp={this.state.setTemperature}
                    />
                    <SunIcon className="SunIcon" />
                    <RadialSlider 
                        setTemp={this.state.setTemperature}
                        handleChangeSetTemp={this.handleChangeSetTemp}
                    />
                </div>
                <div className="Debug">
                    <CurrentTempControl 
                        currTemp={this.state.currTemperature}
                        handleChangeCurrTemp={this.handleChangeCurrTemp}
                    />
                </div>
            </div>
        )
    }
}

export default TemperatureRadialSlider
