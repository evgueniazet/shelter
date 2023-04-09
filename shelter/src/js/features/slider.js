import { pets } from "../data";
import { shuffleArray } from "../utils/shuffleArray";

export const slider = () => {
    const cardsSection = document.querySelector('.cards-section');
    const cards = document.querySelectorAll('.cards-default');
    const buttonRight = document.querySelectorAll('.cards-button-right');
    const buttonLeft = document.querySelectorAll('.cards-button-left');

    shuffleArray(pets);
    let activeCardsArr = [pets[0], pets[1], pets[2]];
    let restCardsArr = [pets[3], pets[4], pets[5]];

    const createCard = (data) => {
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

    const handleResize = () => {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.width = cardsSection.offsetWidth + 'px';
        }
    };

    activeCardsArr.forEach((pet) => {
        cards[1].appendChild(createCard(pet));
    });

    restCardsArr.forEach((pet) => {
        cards[0].appendChild(createCard(pet));
    });
    restCardsArr.forEach((pet) => {
        cards[2].appendChild(createCard(pet));
    });

    window.addEventListener('resize', handleResize);

    const handleButtonRight = () => {
        const cards = document.querySelectorAll('.cards-default');
        cards[1].classList.remove('cards-active');
        cards[1].classList.add('cards-prev');

        cards[2].classList.remove('cards-next');
        cards[2].classList.add('cards-active');
        activeCardsArr = restCardsArr;

        const newRestCardsArr = pets.filter((pet) => restCardsArr.every((item) => item.name !== pet.name));

        shuffleArray(newRestCardsArr);

        restCardsArr = [newRestCardsArr[0], newRestCardsArr[1], newRestCardsArr[2]];
        const cardsNext = cards[0];
        cards[0].remove();

        cardsNext.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
        restCardsArr.forEach((item) => cardsNext.appendChild(createCard(item)));

        cardsNext.classList.remove('cards-prev');
        cardsNext.classList.add('cards-next');
        cardsSection.append(cardsNext);
    };

    const handleButtonLeft = () => {
        const cards = document.querySelectorAll('.cards-default');
        cards[1].classList.remove('cards-active');
        cards[1].classList.add('cards-next');

        cards[0].classList.remove('cards-prev');
        cards[0].classList.add('cards-active');

        const newRestCardsArr = pets.filter((pet) => restCardsArr.every((item) => item.name !== pet.name));

        shuffleArray(newRestCardsArr);

        restCardsArr = [newRestCardsArr[0], newRestCardsArr[1], newRestCardsArr[2]];

        const cardsPrev = cards[2];
        cards[2].remove();

        cardsPrev.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
        restCardsArr.forEach((item) => cardsPrev.appendChild(createCard(item)));

        cardsPrev.classList.remove('cards-next');
        cardsPrev.classList.add('cards-prev');
        cardsSection.prepend(cardsPrev);
    };


    buttonRight.forEach((button) => {
        button.addEventListener('click', handleButtonRight);
    })

    buttonLeft.forEach((button) => {
        button.addEventListener('click', handleButtonLeft);
    })
};
