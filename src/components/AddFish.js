import React from 'react';

const AddFish = ({ addFish }) => {
  const fish = {};

  const handleOnSubmit = (event) => {
    event.preventDefault();
    addFish(fish);
    event.currentTarget.reset();
  };

  const handleOnChange = (event) => {
    const { name, value } = event.currentTarget;
    fish[name] = name === `isAvailable` ? value === `true` : value;
  };

  return (
    <form className="fish-edit" onSubmit={handleOnSubmit}>
      <input type="text" onChange={handleOnChange} name="name" placeholder="Name" />
      <input type="text" onChange={handleOnChange} name="price" placeholder="Price" />
      <select onChange={handleOnChange} name="isAvailable" >
        <option value={true}>
          Fresh!
        </option>
        <option value={false}>
          Sold Out!
        </option>
      </select>
      <textarea onChange={handleOnChange} name="description" placeholder="Description" />
      <input type="text" onChange={handleOnChange} name="image" placeholder="Image" />
      <button type="submit">
        + Add Fish
      </button>
    </form>
  );
}

export default AddFish;