import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  // Initial state
  state = {
    fishes: {},
    order: {}
  };

  // Configuring propTypes
  static propTypes = {
    match: PropTypes.object
  };

  // React Lifecycle Method for mirroring state with firebase
  componentDidMount() {
    // First Reinstantiate Our Local Storage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // This ref is a different ref in firebase is the reference to a piece of data
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  // Lifecycle Method To Store Orders In Local Storage
  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  // Another Lifecycle Method To Unmount In Order To Prevent Unnecessary Data From Saving Into The Database
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // TO ADD DATA IN THE STATE (3 STEPS PROCESS)
  addFish = fish => {
    // 1. Take A Copy Of The Existing State
    const fishes = { ...this.state.fishes };
    // 2. Add Our Fish To That Fishes Variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set The New Fishes Object To State
    this.setState({ fishes });
  };

  // Update Fish Key Is Comming From EditFishForm
  updateFish = (key, updateFish) => {
    // 1. Take A Copy Of The Current State
    const fishes = { ...this.state.fishes };
    // Add Update Fish To The state
    fishes[key] = updateFish;
    // Set State
    this.setState({ fishes });
  };

  // Delete Fish
  deleteFish = key => {
    // 1. Take A Copy Of The State
    const fishes = { ...this.state.fishes };
    // 2. Update The State
    fishes[key] = null;
    // 3. Set State
    this.setState({ fishes });
  };

  // loadSampleFishes To Load Then When we click a button which is in the Inventory Component
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  // Adding Order In The State
  addToOrder = key => {
    // 1. Take A Copy Of State
    const order = { ...this.state.order };
    // Either Add To The Order Or Update The Number In Our Order
    order[key] = order[key] + 1 || 1;
    // Update Our State Object By Using SetState
    this.setState({ order });
  };

  // To Delete Order
  removeFromOrder = key => {
    // 1. Take A Copy Of State
    const order = { ...this.state.order };
    // Remove That Item From Order
    delete order[key];
    // Set State
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh SeaFood Market" />
          <ul className="fishes">
            {/* Objects.keys allow to loop through objects by converting it into an array */}
            {Object.keys(this.state.fishes).map(key => (
              // key is built in react we must gave some unique key to react so that it will operate fast
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                index={key}
              />
            ))}
          </ul>
        </div>
        {/* Object Spread (Spread Every Thing In The State In Order) Syntax = {...this.state}*/}
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}

export default App;
