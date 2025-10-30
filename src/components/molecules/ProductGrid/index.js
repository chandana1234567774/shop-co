import ProductCard from "@/components/molecules/ProductCard";
import { PRODUCTS } from "@/constants/product-constants";

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {PRODUCTS.newArrivals.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
