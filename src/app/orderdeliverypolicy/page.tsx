import React from "react";

const Page = () => {
  return (
    <div className="p-10">
      <h1 className="playfair text-center text-4xl font-bold text-[#333333] mb-4">
        Order Delivery Policy
      </h1>

      <div className="max-w-[800px] mx-auto text-[#333333] space-y-10">
        <h2 className="text-xl font-outfit text-[#333333]">
        At Floral Radiance, we strive to ensure that your fresh flower bouquets are delivered in a timely and professional manner. To provide the best possible service, please review our order delivery policy below.
        </h2>

        <p className="font-outfit text-lg">
        1. <span className="font-bold">Order Timing :</span> 
        We accept orders up to 2-3 hours before your desired delivery time. Please place your order as early as possible to ensure availability and timely delivery. While we aim to accommodate all requests, same-day orders may be subject to flower availability and delivery schedule.
        </p>

        <p className="font-outfit text-lg">
        2. <span className="font-bold">Advance Delivery Charge :</span> 
        To confirm your order, we require an advance delivery charge to be paid at the time of order placement. This ensures your delivery is scheduled and prioritized. The delivery fee is non-refundable once the order is confirmed.
        </p>

        <p className="font-outfit text-lg">
        3.<span className="font-bold">Order Confirmation  :</span>  Process
        After you place your order and pay the delivery charge, one of our team members will reach out to you via phone to confirm the order details. During this call, we will finalize any specific requests and ensure that your bouquet is prepared and delivered according to your preferences.
        </p>

        <p className="font-outfit text-lg">
        4. <span className="font-bold">Delivery Timing and Accuracy :</span> 
        We aim to deliver your flowers within the requested time frame. However, unexpected circumstances such as traffic or weather conditions may cause slight delays. We will notify you if any significant delays occur.
        </p>
        <p className="font-outfit text-lg">
        5.<span className="font-bold">Delivery Locations :</span>  Delivery Locations
        We deliver to the following areas: [insert delivery areas]. If your delivery address falls outside of our standard delivery zones, please contact us directly to discuss special arrangements, as additional charges may apply.
        </p>

        <p className="font-outfit text-lg">
        6.<span className="font-bold">Order Modifications or Cancellations :</span> 
        Once the order is confirmed and the delivery charge is paid, any modifications or cancellations must be made within 1 hour of placing the order. Cancellations made after this period may not be eligible for a refund.
        </p>

        <p className="font-outfit text-lg">
        7.<span className="font-bold">Failed Deliveries :</span>  
        If we are unable to deliver your order due to an incorrect address, absence of the recipient, or refusal to accept the delivery, the order will be considered fulfilled, and no refund will be provided. In such cases, we will contact you to arrange a redelivery, which may incur an additional charge.
        </p>
        <p className="font-outfit text-lg">
        8. <span className="font-bold">Special Delivery Instructions :</span> 
        If you have any special delivery instructions (e.g., leave the flowers at the doorstep), please inform us at the time of order placement. We will do our best to accommodate your requests.
        </p>
      </div>
    </div>
  );
};

export default Page;
