import Heading from "@/components/atoms/Heading";
import en from "@messages/en.json";
import { PRODUCTS } from "@/constants/product-constants";
import ProductGrid from "@/components/molecules/ProductGrid";

const TopSelling = () => (
  <section className="pt-0 pb-10 sm:pt-1 sm:pb-12 md:pt-2 md:pb-14 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* ✅ Using PascalCase path */}
      <Heading
        text={en.Sections.TopSelling}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-10"
      />

      {/* Product Grid */}
      <ProductGrid products={PRODUCTS.topSelling} />

      {/* View All Button */}
      <div className="mt-8 sm:mt-10">
        <button className="bg-white text-black border border-black px-10 sm:px-14 py-2.5 sm:py-3 rounded-full text-sm sm:text-base hover:bg-black hover:text-white transition-all duration-300">
          {en.Buttons.ViewAll}
        </button>
      </div>
    </div>
  </section>
);

export default TopSelling;
