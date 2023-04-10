export const getCardsQuantity = (width) => {
    if (width <= 585) {
        return 1;
    } else if (width > 585 && width < 950) {
        return 2;
    } else {
        return 3;
    }
};