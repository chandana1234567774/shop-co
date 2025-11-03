import React from "react";
import { Text } from "@/components/atoms/Text";
import { Badge } from "@/components/atoms/Badge";

export const ProductPrice = ({
  price,
  originalPrice,
  discount,
  currency = "$",
}) => {
  return (
    <div className="flex items-center gap-2">
      <Text variant="body" weight="semibold" className="text-lg">
        {currency}
        {price}
      </Text>

      {originalPrice && (
        <Text
          variant="body"
          weight="normal"
          className="text-gray-500 line-through"
        >
          {currency}
          {originalPrice}
        </Text>
      )}

      {discount && <Badge variant="success">-{discount}%</Badge>}
    </div>
  );
};
