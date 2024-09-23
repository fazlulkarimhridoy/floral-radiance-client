"use client";
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface ProductType {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
}

interface CartContextType {
  cart: ProductType[];
  addToCart: (product:ProductType ) => void;
  removeFromCart: (productId: number) => void;
  calculateTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([]);

    // Save cart items to localStorage whenever the cart updates
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

      // Retrieve cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product: ProductType) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log(cart);
  };


  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };



  return (
    <CartContext.Provider value={{ cart,addToCart, removeFromCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Save in local storage 


