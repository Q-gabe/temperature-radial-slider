import React, { Component } from 'react'
import 'components/RadialSlider/RadSliderInteractionLayer.css'
import Thumb from 'components/RadialSlider/RadSliderThumb'

/**
 * This component handles the user interaction, using implementing CustomEvents for 
 * scroll handling. This enables the user to change the set temperature by scrolling up
 * and down. The Slider Thumb is also contained within this component.
 */
export class RadSliderInteractionLayer extends Component {
    constructor(props) {
        super(props);

        this.scrollHappened = this.scrollHappened.bind(this);
        this.onUpScroll = this.onUpScroll.bind(this);
        this.onDownScroll = this.onDownScroll.bind(this);
    }

    /*
    * Scrolling capability
    */
    // Handles the onScroll event on the interaction layer and determines the scroll direction
    // and dispatching a CustomEvent representing the direction scrolled.
    scrollHappened(e){
        let element = document.getElementsByClassName("RadSliderInteractionLayer")[0]
        let scrollUpEvent = new CustomEvent("scrollUp"),
        scrollDownEvent = new CustomEvent("scrollDown");
        if(e.deltaY < 0){
            element.dispatchEvent(scrollUpEvent);
        } else {
            element.dispatchEvent(scrollDownEvent);
        }
    }

    // UI handler for scroll up - callback to main container.
    onUpScroll(e) {
        this.props.handleChangeSetTemp(this.props.setTemp + 0.5);
    }

    // UI handler for scroll down - callback to main container.
    onDownScroll(e) {
        this.props.handleChangeSetTemp(this.props.setTemp - 0.5);
    }

    // Add scroll listeners on mount.
    componentDidMount() {
        let element = document.getElementsByClassName("RadSliderInteractionLayer")[0]
        element.addEventListener("scrollUp", this.onUpScroll);
        element.addEventListener("scrollDown", this.onDownScroll);
    }

    // Remove scroll listeners on dismount to avoid memory leaks.
    componentWillUnmount() {
        let element = document.getElementsByClassName("RadSliderInteractionLayer")[0]
        element.removeEventListener("scrollUp", this.onUpScroll);
        element.removeEventListener("scrollDown", this.onDownScroll);
    }

    render() {
        return (
            <div className="RadSliderInteractionLayer" onWheel={this.scrollHappened}>
                <Thumb className="Thumb"
                    handleChangeSetTemp={this.props.handleChangeSetTemp} 
                    setTemp={this.props.setTemp}
                />
            </div>
        )
    }
}

export default RadSliderInteractionLayer
