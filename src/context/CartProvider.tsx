// contexts/CartContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Swal from 'sweetalert2';

type CartItem = {
    id: number;
    product_name: string;
    image: string;
    price: number;
};

type CartContextType = {
    cartData: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
     // New function type for removing items
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem("cartItems");
            if (storedData) {
                setCartData(JSON.parse(storedData));
            }
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("cartItems", JSON.stringify(cartData));
        }
    }, [cartData, isInitialized]);

    const addToCart = (item: CartItem) => {
        const existingProduct = cartData.find(cartItem => cartItem.id === item.id);
        if (!existingProduct) {
            setCartData(prevCartData => [...prevCartData, item]);
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Product already in the cart!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    // Function to remove item from cart
    const removeFromCart = (id: number) => {
        setCartData(prevCartData => prevCartData.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartData([]); // Set cartData to an empty array
    };

    return (
        <CartContext.Provider value={{ cartData, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
