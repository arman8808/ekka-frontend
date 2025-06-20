

import React from 'react';
import {
    Search,
    ClipboardCheck,
    Users,
    HeartHandshake
} from 'lucide-react';

function Process() {
    return (
        <div
            className="relative bg-cover bg-center py-6 px-4 mb-8 h-auto lg:h-[560px]"
            style={{ backgroundImage: "url('/Our Process.svg')" }}
        >
            <div className="text-center mb-16">

                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-medium text-[#6E2D79] mb-2 sm:mb- lg:mb-2 leading-tight">
                    Our Process
                </h2>
                <p className="text-[14px]  sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#A35F93] mb-1 sm:mb-2 lg:mb-4 max-w-sm sm:max-w-md lg:max-w-lg mx-auto leading-relaxed">
                    A structured approach to lasting transformation
                </p>
            </div>


            <div className="flex flex-col lg:flex-row justify-center items-center  gap-10 lg:gap-6 relative z-10">
                {[
                    {
                        icon: <Search className="h-6 w-6 text-white" />,
                        title: 'Discover',
                        desc: 'Explore our programs to find the right approach for your personal growth goals and challenges.',
                        img: '/about/01.png', // Try using one real image path for test
                    },
                    {
                        icon: <ClipboardCheck className="h-6 w-6 text-white" />,
                        title: 'Assess',
                        desc: 'Complete our comprehensive assessment to identify your unique needs and create a tailored plan.',
                        img: '/about/02.png',
                    },
                    {
                        icon: <Users className="h-6 w-6 text-white" />,
                        title: 'Engage',
                        desc: 'Build meaningful connections and engage with experts for a guided transformational journey.',
                        img: '/about/03.png',
                    },
                    {
                        icon: <HeartHandshake className="h-6 w-6 text-white" />,
                        title: 'Transform',
                        desc: 'Embrace lasting change with continuous support and adaptive strategies personalized for you.',
                        img: '/about/04.png',
                    },
                ].map((item, index) => (
                    <React.Fragment key={index}>


                        <div className="relative w-full sm:max-w-[320px] bg-white rounded-[6px] border border-[#989898] shadow-md p-6 flex flex-col items-center text-center">
                            {/* Background Image */}
                            <img
                                src={item.img}
                                alt="bg"
                                className="absolute -top-[50px] left-0 w-[110px] h-[60px] object-contain z-0"
                            />


                            {/* Card content */}
                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                <div className="flex items-center justify-center w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] rounded-full bg-[#6E2D79]">
                                    {item.icon}
                                </div>
                                <h3 className="text-[18px] sm:text-[20px] leading-[28px] sm:leading-[32px] font-semibold text-[#6E2D79]">
                                    {item.title}
                                </h3>
                                <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#A35F93] max-w-[260px]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>

                        {index < 3 && (
                            <img
                                src="/leaveimage.png"
                                alt="arrow"
                                className="hidden lg:block w-[59px] h-[269px]"
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
}

export default Process;
