// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button-Temp';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom'; // ✨ Import useNavigate
import CartSheet from './CartSheet';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { SheetTrigger } from "@/components/ui/Sheet-Temp";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/Dropdown-menu-Temp";
import { User as UserIcon, LogOut, LayoutDashboard, Heart, Package, UserCircle } from 'lucide-react'; // ✨ Import more icons

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export default function Navbar() {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate(); // ✨ Initialize useNavigate

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navClasses = isScrolled || isOpen
        ? "bg-white shadow-md text-gray-800"
        : "bg-black/30 backdrop-blur-lg border-b border-white/10 text-white";
    
    const linkColorClass = isScrolled || isOpen ? "text-gray-600" : "text-white";
    const linkHoverClass = "relative after:absolute after:bg-brand-green after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:transition-all after:duration-300 hover:after:w-full";

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0"><Logo /></div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <Link to="/browse" className={`py-2 text-base font-semibold transition-colors ${linkColorClass} ${linkHoverClass}`}>Browse Deals</Link>
                            
                            {user ? (
                                user.role === 'seller' ? (
                                    <Link to="/add-product" className={`py-2 text-base font-semibold transition-colors ${linkColorClass} ${linkHoverClass}`}>Sell an Item</Link>
                                ) : (
                                    <Link to="/become-a-seller" className={`py-2 text-base font-semibold transition-colors ${linkColorClass} ${linkHoverClass}`}>Become a Seller</Link>
                                )
                            ) : (
                                <Link to="/register" className={`py-2 text-base font-semibold transition-colors ${linkColorClass} ${linkHoverClass}`}>For Sellers</Link>
                            )}

                            {user && (
                                <Link to="/wishlist" className={`py-2 text-base font-semibold transition-colors ${linkColorClass} ${linkHoverClass}`}>My Wishlist</Link>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            // ✨ START: Enhanced Dropdown Menu
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="outline"
                                        className={`rounded-full h-10 px-3 py-2 flex items-center gap-2 
                                        ${isScrolled || isOpen ? "bg-gray-100 border-gray-300 text-brand-charcoal hover:bg-gray-200" : "bg-white/20 border-white/30 text-white hover:bg-white/30"}`}
                                    >
                                        <UserCircle className="h-5 w-5" />
                                        <span className="font-semibold text-sm hidden lg:inline-block">Hi, {user.username}!</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1 p-2">
                                            <p className="text-sm font-medium leading-none">Signed in as</p>
                                            <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuItem asChild className="cursor-pointer">
                                        <Link to="/dashboard" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4 text-brand-green" /> Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer">
                                        <Link to="/wishlist" className="flex items-center gap-2"><Heart className="h-4 w-4 text-brand-green" /> My Wishlist</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled className="flex items-center gap-2">
                                        <Package className="h-4 w-4" /> My Orders
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            //
                        ) : (
                            <>
                                <Link to="/login" className={`hover:text-brand-green text-sm font-medium ${linkColorClass}`}>Log In</Link>
                                <Button asChild className="bg-brand-green hover:bg-brand-green/90 rounded-full font-semibold">
                                    <Link to="/register">Sign Up</Link>
                                </Button>
                            </>
                        )}
                        <CartSheet>
                            <SheetTrigger asChild>
                                <button className="relative hover:text-brand-green">
                                    <CartIcon />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            </SheetTrigger>
                        </CartSheet>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${isScrolled ? "text-gray-500 bg-gray-100" : "text-white bg-black/20"}`}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (unchanged for this request, but ensuring full code is here for context) */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white text-gray-700`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/browse" className="hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Browse Deals</Link>
                    {user ? (
                        user.role === 'seller' ? (
                            <Link to="/add-product" className="hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Sell an Item</Link>
                        ) : (
                            <Link to="/become-a-seller" className="hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Become a Seller</Link>
                        )
                    ) : (
                        <Link to="/register" className="hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>For Sellers</Link>
                    )}
                    {user && (
                        <Link to="/wishlist" className="hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>My Wishlist</Link>
                    )}
                    <hr className="my-2" />
                    {user ? (
                         <>
                            <Link to="/dashboard" className="hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>My Dashboard</Link>
                            <Button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left justify-start">Logout</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Log In</Link>
                            <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 font-semibold mt-1">
                                <Link to="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}