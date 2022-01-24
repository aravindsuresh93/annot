import React from 'react';
import "../App.css"

export default class ShowCordinates extends React.Component {
        constructor(props) {
          super(props);
          this.state = { x: 0, y: 0 };
        }
        _onMouseMove(e) {
          this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        }
        render() {
          const { x, y } = this.state;

          return <div className="viz">
                  <div className="draggable-canvas" onMouseMove={this._onMouseMove.bind(this)}></div>
                  <h1 className="coordinates">x : { x } y : { y }</h1><br/>
                 </div> 
        };
      }
      
      