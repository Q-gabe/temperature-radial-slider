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

        // Construct the left half of the radial track (30 points on one side + middle spoke)
        for (let i = 0; i <= 30; i++) {
            let xoffset = this.getX(i);
            let yoffset = this.getY(i);
            let rotationoffset = this.getAngle(i);
            buffer.push(<Spoke className="Spoke" key={i} id={i} style={{
                transform: `translate(${xoffset}px, ${yoffset}px) rotate(${rotationoffset}rad)`                
            }}/>)
        }
        // Construct the right half of the radial track (30 points on one side excluding middle spoke)
        for (let i = -1; i >= -30; i--) {
            let xoffset = this.getX(i);
            let yoffset = this.getY(i);
            let rotationoffset = this.getAngle(i);
            buffer.push(<Spoke className="Spoke" key={i} id={i} style={{
                transform: `translate(${xoffset}px, ${yoffset}px) rotate(${rotationoffset}rad)`                
            }}/>)
        }
        return buffer;
    }

    /*
    * Convenience functions for determining the XOffset, YOffset and Rotational offset of each spoke 
    * during generation.
    */

    getX(i){
        const rad = 195
        return -rad * Math.sin(this.getAngle(i));
    }

    getY(i){
        const rad = 195
        return rad * Math.cos(this.getAngle(i)) - 19; // Slight y offset
    }

    getAngle(i){
        const rotationDeg = 5
        let angle = 150 * Math.PI/180 + (i*rotationDeg)*(Math.PI/180)
        if (angle >= 2*Math.PI) angle -= 2 * Math.PI;
        return -angle;
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
