import React, { Component } from 'react'
import 'components/RadialSlider/RadialSlider.css';
import RadSliderTrack from 'components/RadialSlider/RadSliderTrack';
import RadSliderInteractionLayer from 'components/RadialSlider/RadSliderInteractionLayer';

/**
 * RadialSlider
 * This component comprises of the Slider track as well as the slider's user interaction layer (includes the Thumb).
 */
export class RadialSlider extends Component {

    render() {
        return (
            <div className = "RadialSlider">
                <RadSliderTrack />
                <RadSliderInteractionLayer 
                    handleChangeSetTemp={this.props.handleChangeSetTemp} 
                    setTemp={this.props.setTemp}
                />
            </div>
        )
    }
}

export default RadialSlider
