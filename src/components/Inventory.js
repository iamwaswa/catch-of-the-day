import React from "react";
import firebase from 'firebase';
import AddFish from './AddFish';
import InventoryFish from './InventoryFish';
import Login from './Login';
import Logout from './Logout';
import base, { firebaseApp } from "../base";

class Inventory extends React.Component { 

  state = {
    currentUserId: null,
    ownerId: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  addFishInventory = () => {
    const { fishes } = this.props;
    return Object.keys(fishes)
      .map(key => {
        if (fishes[key] === null){
          return null;
        }
        
        return (
          <InventoryFish 
            key={key}
            fish={fishes[key]}
            index={key}
            removeFish={this.props.removeFish}
            updateFish={this.props.updateFish}
          />
        );
      }
    );
  }

  authHandler = async (authData) => {
    const { storeId } = this.props;
    const store = await base.fetch(storeId, { context: this });
    if (!store.owner) {
      await base.post(`${storeId}/owner`, { data: authData.user.uid });
    }
    this.setState((prevState, props) => {
      return {
        currentUserId: authData.user.uid,
        ownerId: store.owner || authData.user.uid,
      };
    });
  }

  authenticate = (authService) => {
    const authProvider = new firebase.auth[`${authService}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState((prevState, props) => {
      return {
        currentUserId: null,
      };
    });
  }

  render() {
    const { currentUserId, ownerId } = this.state;

    if (!currentUserId) {
      return (
        <Login authenticate={this.authenticate} />
      );
    }

    if (currentUserId !== ownerId) {
      return (
        <React.Fragment>
          <p>
            Sorry, you are not the owner!
          </p>
          <Logout logout={this.logout}/>
        </React.Fragment>
      );
    }
  
    return (
      <div className="inventory">
        <h2>
          Inventory
        </h2>
        <Logout logout={this.logout}/>
        <ul>
          {this.addFishInventory()}
        </ul>
        <AddFish
          addFish={this.props.addFish} 
        />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;