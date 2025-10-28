const PriceTag = ({ price, oldPrice }) => (
  <div className="flex gap-2 mt-2">
    <span className="text-lg font-bold text-black">${price}</span>
    {oldPrice && (
      <span className="text-sm text-gray-400 line-through">${oldPrice}</span>
    )}
  </div>
);

export default PriceTag;
