import React from 'react';

const Footer = () => {
    return (
        <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600" className="bg-black text-white p-4">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/3">
                                <h3 className="text-lg font-semibold mb-2">About Us</h3>
                                <p className="text-sm">Creative is intelligence having fun</p>
                            </div>
                            <div className="w-full md:w-1/3">
                                <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                                <ul className="text-sm">
                                    <li><a href="../Home">Home</a></li>
                                    <li><a href="../ShopHomePage">Shop</a></li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/3">
                                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                                <p className="text-sm">Email: support@example.com</p>
                                <p className="text-sm">Phone: +1 (123) 456-7890</p>
                            </div>
                        </div>
                    </div>
        </footer>
    );
};

export default Footer;