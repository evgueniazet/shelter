export const createCard = (data) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('card-img');
    img.src = data.img;
    img.alt = `${data.type} ${data.name}`;

    const h4 = document.createElement('h4');
    h4.classList.add('card-title');
    h4.innerText = data.name;

    const cardButton = document.createElement('button');
    cardButton.classList.add('card-button');
    cardButton.innerText = 'Learn More';

    card.append(img, h4, cardButton);

    return card;
}