// src/components/CartSheet.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // ✨ IMPORT Link
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/Sheet-Temp" // ✨ 1. Import SheetClose
import { useCart } from '../hooks/useCart';
import { Button } from './ui/Button';
import { Trash2 } from 'lucide-react';

export default function CartSheet({ children }) {
  const { cartItems, removeFromCart, subtotal } = useCart();

  return (
    <Sheet>
      {children}
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your ResQ Cart</SheetTitle>
        </SheetHeader>
        {cartItems && cartItems.length > 0 ? (
          <>
            <div className="flex-grow overflow-y-auto pr-4">
              <div className="space-y-4">
                {cartItems.map(item => (
                  item.product && (
                    <div key={item.product._id} className="flex items-center gap-4">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex-grow">
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-sm text-gray-500">{item.quantity} x ${item.product.discountedPrice.toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product._id)}>
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  )
                ))}
              </div>
            </div>
            <SheetFooter className="mt-auto border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between font-semibold text-lg mb-4">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
               {/* ✨ 2. Wrap the Button/Link with SheetClose */}
                <SheetClose asChild>
                  <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-lg font-semibold">Your cart is empty.</p>
            <p className="text-sm text-gray-500 mt-2">Find some deals to rescue!</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}