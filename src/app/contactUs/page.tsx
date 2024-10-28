import Image from "next/image";
import React from "react";
import contactImage from "../../../public/Images/share.jpg";

const ContactUs = () => {
    return (
        <div className="bg-[#C3B2E8]">
            <div className="space-y-2">
                <h2 className="text-center py-10 text-4xl font-bold lg:text-5xl italic">
                    Reach out via mail 💌
                </h2>
            </div>
            <div className="grid grid-cols-1 justify-items-center gap-5 px-8 pb-10 max-w-[1590px] mx-auto rounded-lg xl:grid-cols-2 md:px-12 lg:px-16 xl:px-32 text-gray-800">
                <Image
                    src={contactImage}
                    alt="contact_image"
                    className="w-full rounded-2xl"
                />
                <form className="space-y-5 bg-white p-5 md:p-10 rounded-2xl w-full">
                    <div>
                        <label className="text-sm">Full name</label>
                        <input
                            type="text"
                            placeholder="Enter you name here..."
                            className="w-full rounded-xl p-3 border border-gray-200 bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="Enter you email here..."
                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Message</label>
                        <textarea
                            placeholder="Enter you description here..."
                            rows={10}
                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 focus:outline-none"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-sm font-bold uppercase rounded-xl bg-[#B8CEDC] text-gray-50"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
