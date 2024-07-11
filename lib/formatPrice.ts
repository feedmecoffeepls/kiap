export const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
