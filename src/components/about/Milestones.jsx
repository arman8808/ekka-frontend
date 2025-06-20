
import React from 'react';

const Milestones = () => {
    return (
        <div className="w-full my-8">
            {/* Main Title */}
            <h1 className="text-[18px]  sm:text-[20px] md:text-[24px]  lg:text-[24px] font-medium leading-[72px] text-center  text-[var(--color---2,#6E2D79)] font-[Poppins]">
                EKAA Milestones
            </h1>

            {/* Responsive Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">

                {/* Text Card */}
                <div
                    className="inline-flex h-[321px] px-[90px] pt-[105px] pb-[99px] flex-col justify-end items-center gap-[12px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/about/Frame 81.svg')" }}
                >
                    <h2 className="text-[48px] font-semibold leading-[72px] text-[var(--color---2,#6E2D79)] font-[Poppins]">
                        2008
                    </h2>
                    <p className="text-[22px] font-medium leading-[33px] text-[var(--color---2,#6E2D79)] font-[Poppins] text-center">
                        EKAA Foundation established
                    </p>
                </div>

                {/* Image Card */}
                <div
                    className="relative h-[321px] bg-cover bg-center "
                    style={{ backgroundImage: "url('/about/grid/Frame 74.svg')" }}
                >
                </div>

                {/* Text Card */}
                <div
                    className="relative inline-flex h-[321px] px-[90px] pt-[105px] pb-[99px] flex-col justify-end items-center gap-[12px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/about/Frame 81.svg')" }}
                >
                    <div className="absolute hidden lg:block top-19 left-1/2 -translate-x-1/2 sm:top-20 sm:left-1/2 md:top-0 md:-left-1/2 lg:top-0 lg:left-0 z-[999] pointer-events-none">
                        <img src="/leaveimage.png" alt="Leaf" className="" />
                    </div>
                    <h2 className="text-[48px] font-semibold leading-[72px] text-[var(--color---2,#6E2D79)] font-[Poppins]">
                        2012
                    </h2>
                    <p className="text-[22px] font-medium leading-[33px] text-[var(--color---2,#6E2D79)] font-[Poppins] text-center">
                        Courses expanded globally
                    </p>
                </div>

                {/* Image Card with Icon */}
                <div
                    className="relative h-[321px] bg-cover bg-center "
                    style={{ backgroundImage: "url('/programs/image 2 (1).svg')" }}
                >

                </div>

                {/* Text Card */}
                <div
                    className="relative inline-flex h-[321px] px-[90px] pt-[105px] pb-[99px] flex-col justify-end items-center gap-[12px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/about/Frame 81.svg')" }}
                >

                    <div className="absolute hidden lg:block top-19 left-1/2 -translate-x-1/2 sm:top-20 sm:left-1/2 md:top-70 md:left-100 lg:-top-0 lg:left-0 z-[999] pointer-events-none">
                        <img src="/leaveimage.png" alt="Leaf" className="" />
                    </div>
                    <h2 className="text-[48px] font-semibold leading-[72px] text-[var(--color---2,#6E2D79)] font-[Poppins]">
                        2016
                    </h2>
                    <p className="text-[22px] font-medium leading-[33px] text-[var(--color---2,#6E2D79)] font-[Poppins] text-center">
                        10,000+ practitioners certified
                    </p>
                </div>

                {/* Image Card */}
                <div
                    className="relative h-[321px] bg-cover bg-center "
                    style={{ backgroundImage: "url('/about/grid/Frame 76 (1).svg')" }}
                >
                </div>

                {/* Text Card */}
                <div
                    className="inline-flex h-[321px] px-[90px] pt-[105px] pb-[99px] flex-col justify-end items-center gap-[12px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/about/Frame 81.svg')" }}
                >
                    <h2 className="text-[48px] font-semibold leading-[72px] text-[var(--color---2,#6E2D79)] font-[Poppins]">
                        2022
                    </h2>
                    <p className="text-[22px] font-medium leading-[33px] text-[var(--color---2,#6E2D79)] font-[Poppins] text-center">
                        EKAA USA launched
                    </p>
                </div>

                {/* Image Card with Icon */}
                <div
                    className="relative h-[321px] bg-cover bg-center "
                    style={{ backgroundImage: "url('/about/grid/Frame 80.svg')" }}
                >
                </div>

                {/* Text Card */}
                <div
                    className="inline-flex h-[321px] px-[90px] pt-[105px] pb-[99px] flex-col justify-end items-center gap-[12px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/about/Frame 81.svg')" }}
                >
                    <h2 className="text-[48px] font-semibold leading-[72px] text-[var(--color---2,#6E2D79)] ">
                        2024
                    </h2>
                    <p className="text-[22px] font-medium leading-[33px] text-[var(--color---2,#6E2D79)]  text-center">
                        Integrated digital therapy platform launched
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Milestones;

