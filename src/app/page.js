"use client";

import BrowseStyle from "@/components/organisms/BrowseStyle";
import FooterSection from "@/components/organisms/Footer";
import HappyCustomersSection from "@/components/organisms/HappyCustomers";
import Hero from "@/components/organisms/Hero";
import NewArrivals from "@/components/organisms/NewArrivals";
import TopSelling from "@/components/organisms/TopSelling";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen bg-white">
      <Hero />

      <NewArrivals />
      <TopSelling />
      <BrowseStyle />
      <HappyCustomersSection />
    </main>
  );
}
