import React from 'react';
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { useSession } from 'next-auth/react';
import { NumericFormat } from 'react-number-format';

function Checkout() {
    const items = useSelector(selectItems);
    const { data: session } = useSession();
    
    // Calculate the subtotal
    const subtotal = items.reduce((total, item) => total + item.price, 0);

    return (
        <div className='bg-gray-100'>
            <Header/>
            
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* Left Section */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image 
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? "Your Amazon basket is empty." : "Shopping Basket"}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Right Section */}
                <div className='flex flex-col p-5 bg-white shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap '>
                                Subtotal ({items.length} items): 
                                <span className='font-bold'>
                                    <NumericFormat
                                        value={subtotal}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={' $'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                    />
                                </span>
                            </h2>
                            <button 
                                disabled={!session} 
                                className={`button mt-2 ${!session ? 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed' : ''}`}
                            >
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Checkout;
