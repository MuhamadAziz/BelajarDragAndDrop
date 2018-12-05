import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import Target from './Target';
import Card from './Card'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

const update = require('immutability-helper');

class App extends Component {
  state = {
    items: [ 
      { id: 1, name: 'Item 1'},
      { id: 2, name: 'Item 2'},
      { id: 3, name: 'Item 3'},
      { id: 4, name: 'Item 4'},
      { id: 5, name: 'Item 5'},
    ],
    cards: [
      {
        id:1,
        text: 'Laravel',
      },
      {
        id:2,
        text: 'React',
      },
      {
        id:3,
        text: 'PHP',
      },
      {
        id:4,
        text: 'Ruby',
      },
      {
        id:5,
        text: 'Android',
      },
      {
        id:6,
        text: 'VB',
      },
    ],
  }

  deleteItem = (id) => {
    console.log('deleting id :' + id)
    this.setState(prevState => {
      let items = prevState.items;
      const index = items.findIndex(item => item.id == id);

      items.splice(index,1);

      return { items };
 
    });
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0 , dragCard]], 
        }
      })
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <div className="app-container">
            <div className="item-container">
              { this.state.items.map((item, index) => (
                <Item key={item.id} item={item}  handleDrop={(id) =>
                this.deleteItem(id)}/>
              ))}
            </div> 

            <Target />
          </div>

          <div className="card-container">
            { this.state.cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
