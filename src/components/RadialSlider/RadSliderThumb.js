import React, { Component } from 'react'
import 'components/RadialSlider/RadSliderThumb.css'
import {ReactComponent as ThumbImg} from 'images/Thumb.svg'

/**
 * This component is responsible for user interaction with the slider thumb and the calculation
 * of the position and rotation of the thumb based on the temperature.
 * 
 * A Hooks reference to get the X and Y coordinates of the center of the thermostat in order to correctly
 * place the slider thumb.
 * (Inspiration: https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react)
 */
export class RadSliderThumb extends Component {
    constructor(props) {
        super(props);

        this.getX = this.getX.bind(this);
        this.getY = this.getY.bind(this);
        this.getAngle = this.getAngle.bind(this);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.centerRef = React.createRef(); // Hooks reference to get center position.
    }

    /*
    * Event handling for the user interaction with the slider thumb.
    */
    // Adds listeners for movement and mouse up when the user starts his/her drag.
    onMouseDown(e) {
        console.log("======= Mousedown: Tracking Mouse Movement Start =======")
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    }

    // Removes listeners for movement and mouse up when the user ends his/her drag.
    onMouseUp(e) {
        console.log("======= Mouseup: Tracking Mouse Movement End =======")
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    }

    // On move, the angle between the cursor and the center of the thermostat is calculated
    // and mapped to the corresponding temperature value. The temperature is then updated via
    // callback to the main container.
    onMouseMove(e) {
        // Get center marker exact X and Y
        var centerX = document.querySelector('.Center').getBoundingClientRect().left,
        topX = document.querySelector('.Center').getBoundingClientRect().top;

        // Determine angle from center to mouse
        var angle = Math.atan2(e.pageX - centerX, -(e.pageY - topX))*(180/Math.PI);

        // Map angle to temperature and use callback to set
        let temp = Math.round(2*(((angle + 150)/300)*30 + 50))/2;
        this.props.handleChangeSetTemp(temp);
    }

    // Fallback in the case for somehow if the mouseUp event does not successfully get captured,
    // the listeners will not cause memory issues.
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    /*
    * Convenience functions for determining the XOffset, YOffset and Rotational offset of each spoke 
    * during generation.
    */

    // Gets the X position of the thumb based on its calculated angle.
    getX(angle) {
        return 195 * Math.sin(angle*(Math.PI/180)) - 10; // Offset X
    }

    // Gets the Y position of the thumb based on its calculated angle.
    getY(angle) {
        return 195 - (195 * Math.cos(angle*(Math.PI/180)));
    }

    // Gets the angle of the thumb based on the current set temperature.
    getAngle(temperature) {
        let temp = temperature - 50;
        const base = -150;
        return base + ((temp/30) * 300);
    }

    render() {
        let rotationoffset = this.getAngle(this.props.setTemp),
        xoffset = this.getX(rotationoffset),
        yoffset = this.getY(rotationoffset);
        
        return (
            <div>
                <ThumbImg className="Thumb" style={{
                transform: `translate(${xoffset}px, ${yoffset}px) rotate(${rotationoffset}deg)`                
            }} onMouseDown={this.onMouseDown}/>
            <div className="Center" ref={this.centerRef}>
            </div>
            </div>
        )
    }
}

export default RadSliderThumb
