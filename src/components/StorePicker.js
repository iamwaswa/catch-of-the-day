import React from 'react';
import { getFunName } from '../helpers';

const StorePicker = ({ history }) => {
  const storeNameRef = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/store/${storeNameRef.value.value}`);
  };

  return (
      <form className="store-selector" onSubmit={handleSubmit}>
        <h2>
          Please Enter A Store
        </h2>
        <input ref={storeNameRef} type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">
          Visit Store
        </button>
      </form>
    );
}

export default StorePicker;