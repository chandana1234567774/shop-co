"use client";

import { useState, useEffect } from "react";
import en from "@messages/en.json";

export default function PaymentPage() {
  const t = en.PaymentPage || {};

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    ccv: "",
    expiry: "",
  });
  const [errors, setErrors] = useState({});
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    discount: 0,
    delivery: 15,
    total: 0,
  });

  // ✅ Load order summary from localStorage
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const subtotal = storedCart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      );
      const discount = subtotal * 0.2;
      const delivery = 15;
      const total = subtotal - discount + delivery;
      setOrderSummary({ subtotal, discount, delivery, total });
    } catch (error) {
      console.error("Error loading cart for payment summary:", error);
    }
  }, []);

  // ✅ Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      newValue = value.replace(/\D/g, "").slice(0, 12);
    }

    if (name === "ccv") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    if (name === "expiry") {
      newValue = value.replace(/[^0-9/]/g, "");
      if (newValue.length === 2 && !newValue.includes("/")) {
        newValue = newValue + "/";
      }
      if (newValue.length > 5) newValue = newValue.slice(0, 5);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ Validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (form.cardNumber.length !== 12) {
      newErrors.cardNumber = "Card number must be 12 digits";
    }

    if (!form.ccv.trim()) {
      newErrors.ccv = "CCV is required";
    } else if (form.ccv.length !== 3) {
      newErrors.ccv = "CCV must be 3 digits";
    }

    if (!form.expiry.trim()) {
      newErrors.expiry = "Expiry date is required";
    } else {
      const [month, year] = form.expiry.split("/");
      const monthNum = parseInt(month, 10);
      if (
        !monthNum ||
        monthNum < 1 ||
        monthNum > 12 ||
        form.expiry.length !== 5
      ) {
        newErrors.expiry = "Enter a valid expiry in MM/YY format";
      }
    }

    return newErrors;
  };

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert(t.PaymentSuccessMessage || "Payment completed successfully!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F8F8F8] py-10 px-6">
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
                {t.NameLabel || "Full Name"}{" "}
                {errors.name && <span className="text-red-500">*</span>}
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.NamePlaceholder || "John Doe"}
                className={`w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.CardNumberLabel || "Card Number"}{" "}
                {errors.cardNumber && <span className="text-red-500">*</span>}
              </label>
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="XXXXXXXXXXXX"
                className={`w-full border ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black tracking-wider`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            {/* CCV + Expiry */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.CcvLabel || "CCV"}{" "}
                  {errors.ccv && <span className="text-red-500">*</span>}
                </label>
                <input
                  name="ccv"
                  value={form.ccv}
                  onChange={handleChange}
                  placeholder="123"
                  className={`w-full border ${
                    errors.ccv ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black text-center`}
                />
                {errors.ccv && (
                  <p className="text-red-500 text-sm mt-1">{errors.ccv}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.ExpiryLabel || "Expiry (MM/YY)"}{" "}
                  {errors.expiry && <span className="text-red-500">*</span>}
                </label>
                <input
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={`w-full border ${
                    errors.expiry ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black text-center`}
                />
                {errors.expiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-full font-medium text-base hover:bg-gray-900 transition flex justify-center items-center gap-2"
              >
                {t.CompletePaymentButton || "Complete Payment"}
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

        {/* ✅ RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-[#EAF0FA] w-full lg:w-[40%] p-8 md:p-10 flex flex-col rounded-tr-3xl rounded-br-3xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-black rounded-b-md"></div>

          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {t.OrderSummaryTitle || "Order Summary"}
          </h3>

          <div className="bg-[#F3F6FC] rounded-2xl p-5 text-gray-700 text-sm space-y-3">
            <div className="flex justify-between">
              <span>{t.SubtotalLabel || "Subtotal"}</span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>{t.DiscountLabel || "Discount"} (-20%)</span>
              <span className="text-red-600">
                -${orderSummary.discount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t.DeliveryLabel || "Delivery Fee"}</span>
              <span>${orderSummary.delivery.toFixed(2)}</span>
            </div>

            <hr className="border-gray-300 my-3" />

            <div className="flex justify-between font-semibold text-gray-900 text-base">
              <span>{t.TotalLabel || "Total"}</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="relative my-6">
            <div className="border-t border-dashed border-gray-400"></div>
            <div className="absolute -left-3 -top-3 w-6 h-6 bg-[#F8F8F8] rounded-full"></div>
            <div className="absolute -right-3 -top-3 w-6 h-6 bg-[#F8F8F8] rounded-full"></div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm">
                {t.AmountDueLabel || "Amount Due"}
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                ${orderSummary.total.toFixed(2)}
              </div>
            </div>

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
