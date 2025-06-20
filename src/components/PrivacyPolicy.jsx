import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
    return (
        <>
            <div className="min-h-screen  flex items-center justify-center px-4">
                <div className="max-w-2xl text-center">
                    <img
                        src="/comingsoon.jpeg"
                        alt="Coming Soon Illustration"
                        className="w-full max-w-md mx-auto mb-8 "
                    />
                    <p className="text-lg text-[#6E2D79] mb-6">
                        We're working hard to launch this page very soon. Stay tuned!
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-[#6E2D79] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#6E2D79] transition duration-300"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
           
        </>
    );
}