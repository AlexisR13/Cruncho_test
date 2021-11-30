import './mapZoom.css';


export default function MapZoom(props: {zoom: number, onZoomIn: Function, onZoomOut: Function}) {
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
