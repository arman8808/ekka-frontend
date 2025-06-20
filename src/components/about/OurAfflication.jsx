import React from "react";
import { motion } from "framer-motion";

const OurAfflication = () => {
    const data = [
        {
            title: "Hypnosis Alliance",
            description:
                "The International Medical and Dental Hypnotherapy Association connects individuals with certified hypnotherapists trained to support healing and wellness.",
            img: "/affiliation-1 (2).png",
            url: "http://hypnosisalliance.com/",
        },
        {
            title: "Tasso International",
            description:
                "Tasso International offers a 1 to 1.5-year training in Transpersonal Regression Therapy, combining online and in-person modules.",
            img: "/affiliation-2.png",
            url: "https://www.tassointernational.com/",
        },
        {
            title: "Earth Association",
            description:
                "The Earth Association for Regression Therapy (EARTh) is a global organization promoting high standards in regression therapy.",
            img: "/affiliation-3.png",
            url: "https://earthassociation.org/",
        },
    ];

    return (
        <section className="py-16 bg-white text-[#6E2D79] text-center">
            <h2 className="text-[24px] font-semibold mb-12">Our Affiliations</h2>

            <div className="flex flex-row flex-wrap justify-center gap-8 items-stretch">
                {/* Card 1 */}
                <Card item={data[0]} />

                {/* Vertical image between card 1 and 2 */}
                <div className="hidden lg:flex self-center">
                    <img
                        src="/ine.png"
                        alt="divider"
                        className="w-[59px] h-[351px] object-contain"
                    />
                </div>

                {/* Card 2 */}
                <Card item={data[1]} />

                {/* Vertical image between card 2 and 3 */}
                <div className="hidden lg:flex self-center">
                    <img
                        src="/ine.png"
                        alt="divider"
                        className="w-[59px] h-[351px] object-contain"
                    />
                </div>

                {/* Card 3 */}
                <Card item={data[2]} />
            </div>


        </section>
    );
};

const Card = ({ item }) => (
    <div
        className="bg-white border border-black rounded-2xl p-4 flex flex-col justify-between items-center"
        style={{ width: "352px", height: "456px" }}
    >
        <img
            src={item.img}
            alt={item.title}
            className="h-[180px] w-full object-contain mb-4 rounded-md"
        />

        <div className="flex-1 text-center">
            <h3 className="text-[18px] font-medium capitalize text-[#6E2D79] font-poppins mb-2 w-full">
                {item.title}
            </h3>
            <p
                className="text-[#A35F93] font-poppins font-normal leading-6 mt-4"
                style={{ height: "119px", alignSelf: "stretch" }}
            >
                {item.description}
            </p>
        </div>

        <div className="flex justify-center mt-4">
            <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-[122px] flex justify-center items-center gap-[10px] px-[10px] py-[10px] rounded bg-[#6E2D79] text-white text-sm font-medium transition text-center"
            >
                Visit Website
            </motion.a>
        </div>
    </div>
);

export default OurAfflication;