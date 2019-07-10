import React from "react";
import PropTypes from "prop-types";

class StorePicker extends React.Component {
  // Configuring propTypes
  static propTypes = {
    history: PropTypes.object
  };

  // Creating a reference to access input value
  myInput = React.createRef();

  // Converting it in a porperty in order to use this
  goToStore = e => {
    e.preventDefault();
    // Getting input value in react
    const storeName = this.myInput.current.value;
    // Change the page without reloading it
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          placeholder="Store Name"
          required
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
