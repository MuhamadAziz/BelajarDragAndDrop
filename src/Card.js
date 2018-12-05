import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import {
    DragSource,
    DropTarget,
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DropTargetConnector,
    DragSourceConnector,
    DragSourceMonitor,
} from 'react-dnd'
import { XYCoord } from 'dnd-core'
import flow from 'lodash/flow'


const style = {
    border: '1px dashed black',
    padding: '0.5rem 1rem',
    marginBotttom: '.10rem',
    backgroundColor: 'grey',
    cursor: 'move',
}

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
        console.log(this.beginDrag);
    },
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        //Jangan di replact items with themselves
        if(dragIndex == hoverIndex) {
            return 
        }

        const hoverBoundingRect = (findDOMNode(
            component,
        )).getBoundingClientRect()

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const clientOffset = monitor.getClientOffset()

        const hoverClientY = (clientOffset).y - hoverBoundingRect.top 

        if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        props.moveCard(dragIndex, hoverIndex)

        monitor.getItem().index = hoverIndex

    },
}

class Card extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropSource: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
    }

    render() {
        const {
            text,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props
        const opacity = isDragging ? 0 : 1

        return (
            connectDragSource && 
            connectDropTarget &&  
            connectDragSource (
                connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
            )
        )
    }

}

export default flow(
    DragSource(
        'card',
        cardSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    ),
    
    DropTarget('card', cardTarget, (connect) => ({
        connectDropTarget: connect.dropTarget(),
    }))
    
)(Card)