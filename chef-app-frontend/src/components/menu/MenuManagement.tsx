import React from 'react';
import axios from 'axios';

interface Dish {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }
  
  const MenuManagement = () => {
    const [dishes, setDishes] = React.useState<Dish[]>([]);
    const [newDish, setNewDish] = React.useState({
      name: '',
      description: '',
      price: 0,
      category: 'main_course'
    });
  
    const getDishes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dishes');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
  
    const addDish = async () => {
      try {
        const response = await axios.post('http://localhost:3000/dishes', newDish);
        setDishes([...dishes, response.data]);
        setNewDish({
          name: '',
          description: '',
          price: 0,
          category: 'main_course'
        });
      } catch (error) {
        console.error('Error adding dish:', error);
      }
    };
  
    const updateDish = async (_id: string) => {
      try {
        await axios.put(`http://localhost:3000/dishes/${_id}`, newDish);
        setDishes(dishes.map(dish =>
          dish._id === _id ? { ...dish, ...newDish } : dish
        ));
        setNewDish({
          name: '',
          description: '',
          price: 0,
          category: 'main_course'
        });
      } catch (error) {
        console.error('Error updating dish:', error);
      }
    };
  
    const deleteDish = async (_id: string) => {
      try {
        await axios.delete(`http://localhost:3000/dishes/${_id}`);
        setDishes(dishes.filter(dish => dish._id !== _id));
      } catch (error) {
        console.error('Error deleting dish:', error);
      }
    };
  
    React.useEffect(() => {
      getDishes();
    }, []);

    return (
      <div>
        <h1>Menu Management</h1>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Dish Name"
            value={newDish.name}
            onChange={(e) => setNewDish({...newDish, name: e.target.value})}
          />
          <br/>
          <textarea
            placeholder="Description"
            value={newDish.description}
            onChange={(e) => setNewDish({...newDish, description: e.target.value})}
          />
          <br/>
          <input
            type="number"
            placeholder="Price"
            value={newDish.price}
            onChange={(e) => setNewDish({...newDish, price: Number(e.target.value)})}
          />
          <br/>
          <select
            value={newDish.category}
            onChange={(e) => setNewDish({...newDish, category: e.target.value})}
          >
            <option>main_course</option>
            <option>appetizer</option>
            <option>dessert</option>
          </select>
          <br/>
          <button onClick={addDish}>Add Dish</button>
        </div>
        <div>
          {dishes.map((dish) => (
            <div key={dish._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid' }}>
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p>Price: ${dish.price.toFixed(2)}</p>
              <p>Category: {dish.category}</p>
              <button onClick={() => updateDish(dish._id)}>Update</button>
              <button onClick={() => deleteDish(dish._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MenuManagement;