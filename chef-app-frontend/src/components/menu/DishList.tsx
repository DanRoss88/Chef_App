import { useState } from 'react';
import { Grid, Typography, Button, Card, CardContent } from '@mui/material';

interface Dish {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  ingredients: string[];
  allergens: string[];
  available: boolean;
}

interface DishListProps {
  dishes: Dish[];
}

const DishList = ({ dishes }: DishListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDishes = dishes.filter(dish =>
    dish.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Our Menu
      </Typography>
      <input
        type="text"
        placeholder="Search dishes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={2}>
        {filteredDishes.map(dish => (
          <Grid item xs={12} md={6} key={dish._id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {dish.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dish.description}
                </Typography>
                <Typography variant="body2">Price: ${dish.price}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={`/menu/${dish._id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DishList;