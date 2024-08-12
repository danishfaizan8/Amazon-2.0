import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

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

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id, title, price, rating, description, category, image, hasPrime,
    };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className='grid grid-cols-5'>
      <Image src={image} height={200} width={200} objectFit='contain' alt={title} />
      <div className='col-span-3 mx-5'>
        <p className='font-bold text-lg'>{title}</p>
        {renderStars(rating)}
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <p className='text-lg font-semibold'>
          <NumericFormat
            value={price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </p>
        {hasPrime && (
          <div className='flex items-center space-x-2 mt-2'>
            <img
              loading="lazy"
              className='w-12'
              src="https://links.papareact.com/fdw"
              alt="Prime"
            />
            <p className='text-xs text-gray-500'>Free Next Day Delivery</p>
          </div>
        )}
      </div>
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button className='button' onClick={addItemToBasket}>Add to Basket</button>
        <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;