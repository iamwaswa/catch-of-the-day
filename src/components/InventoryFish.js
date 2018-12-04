import React from 'react';

const InventoryFish = ({ fish, index, removeFish, updateFish }) => {
  const handleOnSubmit = (event) => {
    event.preventDefault();
    removeFish(index);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.currentTarget;
    fish[name] = name === `isAvailable` ? value === `true` : value;
    updateFish(index, fish);
  };

  return (
    <form className="fish-edit" onSubmit={handleOnSubmit}>
      <input type="text" onChange={handleOnChange} name="name" value={fish.name} placeholder="Name" />
      <input type="text" onChange={handleOnChange} name="price" value={fish.price} placeholder="Price" />
      <select onChange={handleOnChange} name="isAvailable" value={fish.isAvailable} >
        <option value={true}>
          Fresh!
        </option>
        <option value={false}>
          Sold Out!
        </option>
      </select>
      <textarea onChange={handleOnChange} name="description" value={fish.description} placeholder="Description" />
      <input type="text" onChange={handleOnChange} name="image" value={fish.image} placeholder="Image" />
      <button type="submit">
        Remove Fish
      </button>
    </form>
  );
};

export default InventoryFish;