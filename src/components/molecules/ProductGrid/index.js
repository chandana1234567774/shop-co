import ProductCard from "@/components/molecules/ProductCard";

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
    {products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </div>
);

export default ProductGrid;
