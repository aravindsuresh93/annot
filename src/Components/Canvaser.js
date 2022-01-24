import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

export default class Canvaser extends React.Component {
    
      render() {
        return (
          <Draggable
            handle=".handle0"
            >
            <div className="draggable-canvas handle"></div>
          </Draggable>
        );
      }
    }

