"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import en from "@messages/en.json";

export default function PaymentPage() {
  const router = useRouter();
  const t = en.PaymentPage || {};

  const [form, setForm] = useState({
    name: "",
    cardNumber: "", // stored as formatted "1234 5678 9012 3456"
    ccv: "",
    expiry: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    discount: 0,
    delivery: 15,
    total: 0,
  });

  // Load cart summary
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

  // Format card number into groups of 4
  const formatCardNumber = (digits) =>
    digits
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      // Keep a spaced format for readability, but store/display as spaced groups
      newValue = formatCardNumber(value);
    }

    if (name === "ccv") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    if (name === "expiry") {
      newValue = value.replace(/[^0-9/]/g, "");
      // auto add slash after 2 digits if user types MMYY
      const digits = newValue.replace(/\//g, "");
      if (digits.length > 2) {
        newValue = digits.slice(0, 2) + "/" + digits.slice(2, 4);
      } else if (digits.length === 2 && !newValue.includes("/")) {
        newValue = digits + "/";
      } else {
        newValue = digits;
      }
      if (newValue.length > 5) newValue = newValue.slice(0, 5);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    const rawCardDigits = form.cardNumber.replace(/\s/g, "");
    if (!rawCardDigits) newErrors.cardNumber = "Card number is required";
    else if (rawCardDigits.length !== 16)
      newErrors.cardNumber = "Card number must be 16 digits";

    if (!form.ccv.trim()) newErrors.ccv = "CCV is required";
    else if (form.ccv.length !== 3) newErrors.ccv = "CCV must be 3 digits";

    if (!form.expiry.trim()) newErrors.expiry = "Expiry date is required";
    else {
      const parts = form.expiry.split("/");
      const month = parts[0] || "";
      const year = parts[1] || "";
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);
      const currentYear = parseInt(
        new Date().getFullYear().toString().slice(-2)
      );
      const currentMonth = new Date().getMonth() + 1;

      if (
        !monthNum ||
        monthNum < 1 ||
        monthNum > 12 ||
        !yearNum ||
        form.expiry.length !== 5
      ) {
        newErrors.expiry = "Enter a valid expiry in MM/YY format";
      } else if (
        yearNum < currentYear ||
        (yearNum === currentYear && monthNum < currentMonth)
      ) {
        newErrors.expiry = "Card has expired";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      localStorage.removeItem("cart");

      window.dispatchEvent(new Event("cartUpdated"));

      setPaymentSuccess(true);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8F8F8] px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-900 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F8F8F8] py-10 px-6">
      <div className="bg-white rounded-3xl shadow-lg flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden gap-x-10">
        {/* LEFT - PAYMENT FORM */}
        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {t.Title || "Payment Details"}
          </h2>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-6"
          >
            <div>
              <label
                className="text-sm text-gray-700 font-medium"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
                aria-label="Full Name"
                className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 mt-1`}
                placeholder="Enter your name"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* CARD NUMBER */}
            <div>
              <label
                className="text-sm text-gray-700 font-medium"
                htmlFor="cardNumber"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                inputMode="numeric"
                autoComplete="off"
                placeholder="xxxx xxxx xxxx xxxx"
                maxLength={19}
                className={`w-full border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 mt-1 tracking-wider`}
                type="text"
              />

              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>

            {/* CCV + EXPIRY */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="text-sm text-gray-700 font-medium"
                  htmlFor="ccv"
                >
                  CCV
                </label>
                <input
                  id="ccv"
                  name="ccv"
                  value={form.ccv}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="123"
                  inputMode="numeric"
                  maxLength={3}
                  className={`w-full border ${errors.ccv ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 text-center mt-1`}
                  type="text"
                />

                {errors.ccv && (
                  <p className="text-red-500 text-sm">{errors.ccv}</p>
                )}
              </div>

              <div className="flex-1">
                <label
                  className="text-sm text-gray-700 font-medium"
                  htmlFor="expiry"
                >
                  Expiry Date
                </label>
                <input
                  id="expiry"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="MM/YY"
                  inputMode="numeric"
                  maxLength={5}
                  className={`w-full border ${errors.expiry ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 text-center mt-1`}
                  type="text"
                />

                {errors.expiry && (
                  <p className="text-red-500 text-sm">{errors.expiry}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition"
            >
              Complete Payment
            </button>
          </form>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="bg-[#EAF0FA] p-8 md:p-10 w-full lg:w-[40%] rounded-tr-3xl rounded-br-3xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Order Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount (20%)</span>
              <span className="text-red-500">
                -${orderSummary.discount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>${orderSummary.delivery.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
