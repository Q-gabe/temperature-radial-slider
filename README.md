<h1 align="center"> temperature-radial-slider</h1>
<p align="center">
	<a href = "https://reactjs.org"><img src="https://img.shields.io/badge/Made with-React-23425C?logo=react"></a>
	<a href = ""><img src="https://img.shields.io/badge/Powered by-Caffeine-blue?logo=Buy-Me-A-Coffee"></a>
	<a href = "https://github.com/Q-gabe/temperature-radial-slider/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-informational"></a>
</p>

A fully customised Radial Slider built in ReactJS simulating a thermostat, leveraging skeuomorphic and intuitive design. This project was built as part of an assignment for the NUS CS3249 UI Development module. The React App has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
  

## Preview :sparkles:


<div align="center">
	<img src="https://raw.githubusercontent.com/Q-gabe/temperature-radial-slider/master/preview/animatedPreview1.gif" width="300" hspace="20">
	<img src="https://raw.githubusercontent.com/Q-gabe/temperature-radial-slider/master/preview/animatedPreview2.gif" width="300" hspace="20">
</div>

<div align="center">
	<span>Drag along the track or use your mouse wheel to scroll!</span>
</div>

<h3 align="center"><a href="https://q-gabe.me/temperature-radial-slider/">See the live interactive demo here!</a></h3>

## Implementation Details :thinking:

In this implementation, the **current temperature** (environment) and **target temperature** (intended) can be set, with the former being set via a debugging slider on the bottom of the widget. Depending on the difference between the current temperature and target temperature, the **thermostat will indicate that it needs to either heat or cool the environment**. This is indicated by the color change of the face of the thermostat. 

However, as there is no simulation on the actual cooling or warming, the state of the thermostat will continue indefinitely until the difference between both temperatures are small enough for thermostat to transit back into its idle state.

## Getting started :space_invader:

If you are new to React, make sure you have **Node v10.16.0** or later installed on your system.

To deploy this application locally, clone this repository onto your computer. Then, navigate to the folder where you cloned the repository. 
```
# Navigate to cloned repository
cd temperature-radial-slider
# Install all dependencies
npm install
# Run the local development build
npm start
```
  
### Dependencies: 

* XState - [https://xstate.js.org/docs/](https://xstate.js.org/docs/)
  
## Documentation :book:
 

### File Structure


Here is the basic core folder structure of the app, omitting all CSS and styling related classes (generally, all .CSS files are named exactly the same as the component that is referencing it, and are placed in the same folder).
```
components/
	Face.js
	TemperatureGauges.js
	Debug/
		CurrentTempControl.js
	RadialSlider/
		RadialSlider.js
		RadSliderThumb.js
		RadSliderTrack.js
		RadSliderInteractionLayer.js
containers/
	TemperatureRadialSlider.js
data/
	ModeMachine.js
	Thermostat.js
images/
```  

React Components are split into *components* and *containers*, which are components that have to do more with UI logic, while the latter is more concerned with presentation logic and also maintains most of the states in which to progagate to the rest of the DOM tree as props. This architecture of containers and components allow for easy extensibility down the line as complex UI components can just be grouped and contained entirely within containers. This also potentially allows for a narrower API interface for parent components to pass props or states down to, making it easy to work with. 

#### TemperatureRadialSlider
This container acts as the main parent for the overall temperature radial slider component and maintains the states for the temperatures as well as the functions that are passed as callbacks to all the child components. An XState-implemented state machine is also utilised within this component to track the mode of the thermostat.

#### Face and TemperatureGauges

The Face component is responsible for the color changes of the thermostat face by reading props passed to it from TemperatureRadialSlider. Similarly, TemperatureGauges are in charge of displaying the value of the current and set temperatures to the UI.

#### Debug

The CurrentTempControl component is also a child component of TemperatureRadialSlider but is intended for debugging purposes, as we require a way to manipulate the current temperature to check it correctness of the radial slider. Currently, the it maintains a callback to set the relevant temperature in TemperatureRadialSlider.

#### RadSlider

The components in the RadSlider/ are meant to (1) display the radial slider track but also (2) handle the UI logic when it comes to interaction with the slider thumb and face itself, as it is rendered at the highest z-index div. RadialSlider is the parent class here to arrange the RadSliderThumb, RadSliderTrack and RadSliderInteractionLayer.

#### Data

ModeMachine contains a state machine defined using XState to manage the thermostat mode in TemperatureRadialSlider. The Thermostat is also modelled here with all the (assignment) variables for thresholds initialised here. TemperatureRadialSlider uses this Thermostat instance to check if a threshold has been reached so that the thermostat mode can be updated appropriately.

## License :pencil:

 This project is licensed under the MIT License - see the [LICENSE](https://github.com/Q-gabe/temperature-radial-slider/blob/master/LICENSE) file for details.
 