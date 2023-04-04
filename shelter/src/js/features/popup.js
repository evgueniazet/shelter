export const popup = () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            console.log('клик по карточке');
        });
    })
};