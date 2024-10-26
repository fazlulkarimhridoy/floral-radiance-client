import Image from "next/image";
import React from "react";
import contactImage from "../../../public/Images/share.jpg";

const ContactUs = () => {
  return (
    <div className="bg-[#B8CEDC] min-h-screen">
      <div className="space-y-2">
        <h2 className="text-center py-10 text-4xl font-bold lg:text-5xl italic">Reach out via mail 💌</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 px-8 pb-10 mx-auto rounded-lg xl:grid-cols-2 md:px-12 lg:px-16 xl:px-32 text-gray-800">
          <Image src={contactImage} alt="contact_image" className="w-full max-h-[650px] rounded-3xl" />
        <form className="space-y-5 bg-white p-5 md:p-10 rounded-3xl max-h-[650px]">
          <div>
            <label className="text-sm">Full name</label>
            <input
              type="text"
              placeholder=""
              className="w-full rounded-2xl p-3 border border-black bg-gray-100"
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-black rounded-2xl bg-gray-100"
            />
          </div>
          <div>
            <label className="text-sm">Message</label>
            <textarea rows={10} className="w-full p-3 border border-black rounded-2xl bg-gray-100"></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-sm font-bold uppercase rounded-2xl bg-emerald-600 text-gray-50"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
