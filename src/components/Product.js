import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from "react-redux";
import { addToBasket } from '../slices/basketSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

const renderStars = (rating) => {
  return (
    <div className='flex'>
      {Array(5).fill().map((_, i) => (
        <StarIcon 
          key={i} 
          className={`h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
};

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(null);
  const [hasPrime, setHasPrime] = useState(null);

  const addItemToBasket = () => {
    const product = {
      id, title, price, rating, description, category, image, hasPrime,
    };
    dispatch(addToBasket(product));
  };

  useEffect(() => {
    // Set rating and hasPrime only on the client
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);

  if (rating === null || hasPrime === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
      <div className='flex justify-center mb-4'>
        <div className='relative w-48 h-48'>
          <Image 
            src={image} 
            layout='fill' 
            objectFit='contain' 
            alt={title} 
            className='rounded-md'
          />
        </div>
      </div>

      <h4 className='my-3'>{title}</h4>
      {renderStars(rating)}
      <p className='text-xs my-2 line-clamp-2'>{description}</p>
      <div className='mb-5'>
        <NumericFormat
          value={price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </div>
      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src="/image.png" alt="Prime" />
          <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
        </div>
      )}
      
      <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
    </div>
  );
}

export default Product;