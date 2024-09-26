import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div>
      <h1 className="playfair text-5xl font-bold text-[#333333] text-center mx-auto max-w-[600px] my-8">
        How Our Flower Bouquet Service Works
      </h1>
      <div className="grid  grid-cols-1 md:grid-cols-3 md:grid-rows-3 p-2 md:p-0 md:w-[70%] mx-auto gap-4 m-10">
        <div className=" md:row-span-2  bg-[#c3b2e8] rounded-xl p-4 flex flex-col gap-2 justify-center items-center text-center">
          <Image
            className="rounded-full bg-none"
            src={"/Images/explore.jpg"}
            alt="image"
            width={200}
            height={200}
          />
          <h1 className="playfair text-2xl font-bold text-[#4c2366]">
            Explore Our Collection
          </h1>
          <p className="font-outfit text-xl">
          Explore a variety of beautiful flower bouquets for every occasion.
          </p>
          <Image
            className="rounded-xl bg-none"
            src={"/Images/giving-flower.jpg"}
            alt="image"
            width={300}
            height={300}
          />
        </div>
        <div className=" md:col-span-2  bg-[#f682a5] rounded-xl p-4 ">
          <div className="space-y-4">
            <Image
              className="rounded-xl bg-none object-fill bg-slate-800"
              src={"/Images/choose.jpg"}
              alt="image"
              width={200}
              height={200}
            />
            <h1 className="playfair text-2xl font-bold text-[#4c2366]">
              Choose Your Perfect Bouquet
            </h1>
            <p className="font-outfit text-xl">
            Choose your favorite and customize it with special add-ons.
            </p>
          </div>
          <div></div>
        </div>
        <div className="  bg-[#c4d68c] rounded-xl p-4 space-y-2">
          <Image
            className="rounded-xl bg-none object-fill bg-slate-800"
            src={"/Images/place-order.jpg"}
            alt="image"
            width={200}
            height={200}
          />
          <h1 className="playfair text-2xl font-bold text-[#25441a]">
            Place Your Order
          </h1>
          <p className="font-outfit text-xl">
          Provide delivery details and pick a date
          </p>
        </div>
        <div className=" bg-[#ffdf70] rounded-xl p-4 space-y-2">
          <Image
            className="rounded-xl bg-none object-fill bg-slate-800"
            src={"/Images/payment.jpg"}
            alt="image"
            width={200}
            height={200}
          />
          <h1 className="playfair text-2xl font-bold text-[#48431c]">
            Secure Checkout
          </h1>
          <p className="font-outfit text-xl">
          Make a payment through our trusted gateway.
          </p>
        </div>
        <div className="md:col-span-2  bg-[#f8a475] rounded-xl p-4 relative flex flex-row-reverse ">
          <div>
            <Image
              className="rounded-full bg-none object-fill bg-slate-800  right-4"
              src={"/Images/delivery.jpg"}
              alt="image"
              width={400}
              height={300}
            />
          </div>

          <div>
            <h1 className="playfair text-2xl font-bold text-[#5a2611]">
              We Handcraft & Deliver
            </h1>
            <p className="font-outfit text-xl">
            Our florists prepare and deliver your bouquet fresh.
            </p>
          </div>
        </div>
        <div className="  bg-[#b8cedc] rounded-xl p-4 flex flex-col justify-center">
        <Image
            className="rounded-full bg-none object-fill bg-slate-800  right-4"
            src={"/Images/share.jpg"}
            alt="image"
            width={200}
            height={200}
          />
          <h1 className="text-[#174365] playfair text-2xl font-bold">
            Enjoy and Share
          </h1>
          <p className="font-outfit text-xl">
          Brighten someone’s day with stunning flowers!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
