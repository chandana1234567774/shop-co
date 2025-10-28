"use client";

import { useState } from "react";
import en from "@messages/en.json";

export default function PaymentPage() {
  const t = en.PaymentPage || {};

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    ccv: "",
    expiry: "",
  });

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t.PaymentSuccessMessage || "Payment completed successfully!");
  };

  const orderSummary = {
    orderId: "11458523",
    tax: 20,
    taxTotal: 123.28,
    total: 576.32,
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F8F8F8] py-10 px-6">
      {/* Added gap-x-10 for spacing between payment form and receipt */}
      <div className="bg-white rounded-3xl shadow-lg flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden gap-x-10">
        {/* LEFT SIDE - PAYMENT FORM */}
        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {t.Title || "Payment Details"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.NameLabel || "Full Name"}
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.NamePlaceholder || "John Doe"}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.CardNumberLabel || "Card Number"}
              </label>
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder={t.CardNumberPlaceholder || "XXXX XXXX XXXX XXXX"}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black tracking-wider"
                maxLength={19}
                required
              />
            </div>

            {/* CCV + Expiry */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.CcvLabel || "CCV"}
                </label>
                <input
                  name="ccv"
                  value={form.ccv}
                  onChange={handleChange}
                  placeholder={t.CcvPlaceholder || "123"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black text-center"
                  maxLength={4}
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.ExpiryLabel || "Expiry (MM/YY)"}
                </label>
                <input
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder={t.ExpiryPlaceholder || "MM/YY"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black text-center"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-full font-medium text-base hover:bg-gray-900 transition flex justify-center items-center gap-2"
              >
                {t.CompletePaymentButton || "Go to Checkout"}
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY (Receipt Style) */}
        <div className="bg-[#EAF0FA] w-full lg:w-[40%] p-8 md:p-10 flex flex-col rounded-tr-3xl rounded-br-3xl relative">
          {/* top tab accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-black-400 rounded-b-md"></div>

          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {t.OrderSummaryTitle || "Order Summary"}
          </h3>

          {/* order info box */}
          <div className="bg-[#F3F6FC] rounded-2xl p-5 text-gray-700 text-sm space-y-3">
            <div className="flex justify-between">
              <span>{t.OrderIdLabel || "Order Number"}</span>
              <span className="font-semibold">{orderSummary.orderId}</span>
            </div>

            <div className="flex justify-between">
              <span>{t.TaxLabel || "Tax"}</span>
              <span>%{orderSummary.tax}</span>
            </div>

            <div className="flex justify-between">
              <span>{t.TaxTotalLabel || "Tax Amount"}</span>
              <span>${orderSummary.taxTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>{t.DeliveryLabel || "Order Total"}</span>
              <span>${orderSummary.taxTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* dotted line with cutouts */}
          <div className="relative my-6">
            <div className="border-t border-dashed border-gray-400"></div>
            <div className="absolute -left-3 -top-3 w-6 h-6 bg-[#F8F8F8] rounded-full"></div>
            <div className="absolute -right-3 -top-3 w-6 h-6 bg-[#F8F8F8] rounded-full"></div>
          </div>

          {/* bottom total section */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm">
                {t.AmountDueLabel || "Amount Due"}
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                ${orderSummary.total.toFixed(2)}
              </div>
            </div>

            {/* Receipt icon */}
            <div className="w-10 h-10 bg-[#D3DBEB] flex items-center justify-center rounded-lg">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 2h12a2 2 0 0 1 2 2v18l-3-2-3 2-3-2-3 2-3-2V4a2 2 0 0 1 2-2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="8" y1="8" x2="16" y2="8" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
