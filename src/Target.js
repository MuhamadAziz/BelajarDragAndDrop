 import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

function collect(connect, monitor) {
    return {
        connectDropTarget : connect.dropTarget(),
        hoverd: monitor.isOver(),
        item: monitor.getItem(),
    }
}
 class Target extends Component {
     render () {
    
        const { connectDropTarget, hoverd, item } = this.props;
        const backgroundColor = hoverd ? 'lightgreen' : 'white'
         return connectDropTarget(
             <div className="target" style={{ backgroundColor }}>
                target
             </div>
         )
     }
 }

 export default DropTarget('item',{},collect)(Target);