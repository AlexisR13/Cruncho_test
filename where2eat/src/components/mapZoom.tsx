import React from 'react';
import './mapZoom.css';


export default function MapZoom(props: {zoom: number, onZoomIn: Function, onZoomOut: Function}) {
    function handleOnChange(ev: React.ChangeEvent) {
        // pass the values to the parent component
        //@ts-ignore
        props.onChange(ev.target.name, ev.target.value);
    }

    function handleZoomIn(){
        props.onZoomIn()
    }
    function handleZoomOut(){
      props.onZoomOut()
  }

    return (
      <>
        <div id="ButtonsContainer">
          <button onClick={() => handleZoomIn()} id="upButton">+</button>
          <button onClick={() => handleZoomOut()} id="downButton">-</button>
        </div>
      </>
    )
}
