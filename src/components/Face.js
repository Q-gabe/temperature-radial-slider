import React, { Component } from 'react'
import 'components/Face.css'
import { ReactComponent as BGFace } from 'images/InnerFace.svg'
import { ReactComponent as HotFace } from 'images/HotFace.svg'
import { ReactComponent as ColdFace } from 'images/ColdFace.svg'

/**
 * This component implements the changing color of the face of the thermostat
 * (Blue = A/C / Cooling mode. Red = Heater / Heating mode.)
 */
export class Face extends Component {

    constructor(props) {
        super(props);

        this.getColorOpacity = this.getColorOpacity.bind(this);
    }

    // From the given set and current temperature, the delta is calculated to
    // determine how much the opacity of the red heat layer and the blue cool
    // layer should change.
    getColorOpacity(set, curr) {
        let tempDelta = Math.abs(set - curr),

        colorOpacity = 0.3;
        tempDelta -= 0.5;

        while (tempDelta >= 0 && colorOpacity <= 0.7) {
            tempDelta -= 0.5
            colorOpacity += 0.1
        }
        return colorOpacity;
    }

    render() {
        const colorOpacity = this.getColorOpacity(this.props.setTemp, this.props.currTemp);

        // Turns visual heat red and cool blue layers off depending on the mode.
        var hotModifier = (this.props.mode !== "heating") ? 0 : 1
        var coldModifier = (this.props.mode !== "cooling") ? 0 : 1

        return (
            <div className="Face">
                <BGFace className="BGFace" />
                <HotFace className="HotFace" style={{
                    opacity: `${colorOpacity*hotModifier}`
                    }}/>
                <ColdFace className="ColdFace" style={{
                    opacity: `${colorOpacity*coldModifier}`
                    }}/>
            </div>
        )
    }
}

export default Face
