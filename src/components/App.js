import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {

  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.fishesRebaseBinding = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: `fishes`,
    });
    this.orderRebaseBinding = base.syncState(`${params.storeId}/order`, {
      context: this,
      state: `order`,
    });
  }
  
  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState((prevState, props) => {
      return {
        fishes,
      };
    });
  }

  removeFish = (key) => {
    const { fishes, order } = this.state;
    fishes[key] = null;
    this.setState((prevState, props) => {
      return {
        fishes,
      };
    });
    if (order[key]) {
      this.removeFromOrder(key);
    }
  }

  updateFish = (key, updatedFish) => {
    this.setState((prevState, props) => {
      return {
        fishes: {
          ...prevState.fishes,
          [key]: updatedFish,
        },
      };
    });
  };

  loadSampleFishes = () => {
    const fishes = { ...this.state.fishes };
    this.setState((prevState, props) => {
      return {
        fishes: {
          ...sampleFishes,
          ...fishes, 
        },
      };
    });
  }

  renderFishes = () => {
    const { fishes } = this.state;
    const keys = Object.keys(fishes);
    return keys.map((key) => {

      if (fishes[key] === null) {
        return null;
      }

      return (
        <Fish 
          key={key} 
          index={key} 
          details={fishes[key]} 
          addToOrder={this.addToOrder}
        />
      );
    })
  }

  addToOrder = (key) => {
    const { order } = this.state;
    order[key] = order[key] ? order[key] + 1 : 1;
    this.setState((prevState, props) => {
      return {
        order,
      };
    });
  }

  removeFromOrder = (key) => {
    const { order } = this.state;
    order[key] = null;
    this.setState((prevState, props) => {
      return {
        order,
      };
    });
  }

  render() {
    const { order, fishes } = this.state;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={100} />
          <ul>
            {this.renderFishes()}
          </ul>
        </div>
        <Order 
          fishes={fishes} 
          order={order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          fishes={fishes}
          addFish={this.addFish} 
          removeFish={this.removeFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;