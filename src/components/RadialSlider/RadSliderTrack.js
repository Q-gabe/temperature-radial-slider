import React, { Component } from 'react'
import 'components/RadialSlider/RadSliderTrack.css';
import {ReactComponent as Spoke} from 'images/Spoke.svg'

/**
 * This component is responsible for creating the spokes around the circumference of the gauge
 * for the user to visually determine where the slider range is bounded.
 */
export class RadSliderTrack extends Component {

    constructor(props) {
        super(props);
        this.getTrack = this.getTrack.bind(this);
        this.getX = this.getX.bind(this);
        this.getY = this.getY.bind(this);
        this.getAngle = this.getAngle.bind(this);
    }

    // Creates and returns and array of Spoke components with the X and Y offset and rotation
    // calculated based on a reference middle spoke and index.
    getTrack() {
        let buffer = []

        // Construct the radial track starting from the last spoke at -150 deg, to the 61st at 150 deg.
        for (let i = 0; i <= 60; i++) {
            let xoffset = this.getX(i);
            let yoffset = this.getY(i);
            let rotationoffset = this.getAngle(i);
            buffer.push(<Spoke className="Spoke" key={i} id={i} style={{
                transform: `translate(${xoffset}px, ${yoffset}px) rotate(${rotationoffset}deg)`                
            }}/>)
            console.log(rotationoffset);
        }
        return buffer;
    }

    /*
    * Convenience functions for determining the XOffset, YOffset and Rotational offset of each spoke 
    * during generation.
    */
    // Gets the X offset of a spoke to place it in a circle given its index
    getX(i){
        return 195 * Math.sin(this.getAngle(i)*(Math.PI/180)) - 1; // 1px X offset
    }
    // Gets the Y offset of a spoke given its index
    getY(i){
        return 195 - (195 * Math.cos(this.getAngle(i)*(Math.PI/180))) + 42; // 42px y offset
    }

    // Gets the angle in deg of a spoke to place it in a circle given its index
    getAngle(i){
        const rotationDeg = 5,
        base = -150;
        return i*rotationDeg + base;
    }
    
    render() {
        const spokes = this.getTrack();
        return (
            <div className = "RadSliderTrack">
                <div className="Spokes">{spokes}</div>
            </div>
        )
    }
}

export default RadSliderTrack
