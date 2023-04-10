import { pets } from "../data";
import { shuffleArray } from "../utils/shuffleArray";
import { createCard } from "../utils/createCard.js";
import { getCardsQuantity } from "../utils/getCardsQuantity";

export const slider = () => {
    const cardsSection = document.querySelector('.cards-section');
    const cards = document.querySelectorAll('.cards-default');
    const buttonRight = document.querySelectorAll('.cards-button-right');
    const buttonLeft = document.querySelectorAll('.cards-button-left');

    const initialWidth = document.body.offsetWidth;
    let originalCardsQuantity = getCardsQuantity(initialWidth);
    let cardsQuantity = getCardsQuantity(initialWidth);

    shuffleArray(pets);

    let activeCardsArr = pets.filter((_, index) => index < cardsQuantity);
    let prevCardsArr = pets.filter((_, index) => index >= cardsQuantity && index < cardsQuantity * 2);
    let nextCardsArr = pets.filter((_, index) => index >= cardsQuantity * 2 - 1 && index < cardsQuantity * 3 - 1);
    const cardsMemory = {
        prev: prevCardsArr,
        active: activeCardsArr,
        next: nextCardsArr
    };

    const handleButtonRight = () => {
        const cards = document.querySelectorAll('.cards-default');
        cards[1].classList.remove('cards-active');
        cards[1].classList.add('cards-prev');

        cards[2].classList.remove('cards-next');
        cards[2].classList.add('cards-active');
        prevCardsArr = activeCardsArr;
        activeCardsArr = nextCardsArr;

        const newNextCardsArr = pets.filter((pet) => activeCardsArr.every((item) => item.name !== pet.name));

        shuffleArray(newNextCardsArr);

        nextCardsArr = newNextCardsArr.filter((_, index) => index < cardsQuantity);
        const cardsNext = cards[0];
        cards[0].remove();

        cardsNext.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
        nextCardsArr.forEach((item) => cardsNext.appendChild(createCard(item)));
        cardsMemory.prev = prevCardsArr;
        cardsMemory.active = activeCardsArr;
        cardsMemory.next = nextCardsArr;

        cardsNext.classList.remove('cards-prev');
        cardsNext.classList.add('cards-next');
        cardsSection.append(cardsNext);
        originalCardsQuantity = cardsQuantity;
    };

    const handleButtonLeft = () => {
        const cards = document.querySelectorAll('.cards-default');
        cards[1].classList.remove('cards-active');
        cards[1].classList.add('cards-next');

        cards[0].classList.remove('cards-prev');
        cards[0].classList.add('cards-active');
        nextCardsArr = activeCardsArr;
        activeCardsArr = prevCardsArr;

        const newPrevCardsArr = pets.filter((pet) => activeCardsArr.every((item) => item.name !== pet.name));

        shuffleArray(newPrevCardsArr);

        prevCardsArr = newPrevCardsArr.filter((_, index) => index < cardsQuantity);

        const cardsPrev = cards[2];
        cards[2].remove();

        cardsPrev.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
        prevCardsArr.forEach((item) => cardsPrev.appendChild(createCard(item)));
        cardsMemory.prev = prevCardsArr;
        cardsMemory.active = activeCardsArr;
        cardsMemory.next = nextCardsArr;

        cardsPrev.classList.remove('cards-next');
        cardsPrev.classList.add('cards-prev');
        cardsSection.prepend(cardsPrev);
        originalCardsQuantity = cardsQuantity;
    };

    const handleResize = () => {
        const currentWidth = document.body.offsetWidth;
        const newCardsQuantity = getCardsQuantity(currentWidth);

        if (newCardsQuantity !== cardsQuantity) {
            const memoizedPrevCards = cardsMemory.prev;
            const memoizedActiveCards = cardsMemory.active;
            const memoizedNextCards = cardsMemory.next;

            if (newCardsQuantity < cardsQuantity) {
                const newActiveCards = memoizedActiveCards.filter((_, index) => index < newCardsQuantity);
                const restActiveCards = memoizedActiveCards.filter((_, index) => index >= newCardsQuantity);
                let newNextCards = [];
                const newPrevCards = memoizedPrevCards.reverse().filter((_, index) => index < newCardsQuantity);

                if (restActiveCards.length < newCardsQuantity) {
                    const cardsToAddQuantity = newCardsQuantity - restActiveCards.length;
                    const activeCardsToAdd = memoizedNextCards.filter((_, index) => index < cardsToAddQuantity);

                    newNextCards = [...restActiveCards, ...activeCardsToAdd]
                } else if (restActiveCards.length === newCardsQuantity) {
                    newNextCards = restActiveCards;
                } else if (restActiveCards.length > newCardsQuantity) {
                    newNextCards = restActiveCards.filter((_, index) => index < newCardsQuantity);
                }

                cards[0].querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
                cards[1].querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
                cards[2].querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));

                newPrevCards.forEach((pet) => {
                    cards[0].appendChild(createCard(pet));
                });
                newActiveCards.forEach((pet) => {
                    cards[1].appendChild(createCard(pet));
                });
                newNextCards.forEach((pet) => {
                    cards[2].appendChild(createCard(pet));
                });
            } else if (newCardsQuantity > cardsQuantity) {
                let newActiveCards = memoizedActiveCards.filter((_, index) => index < newCardsQuantity);
                let restActiveCards = memoizedActiveCards.filter((_, index) => index >= newCardsQuantity);
                let restNextCards = memoizedNextCards;
                let restPrevCards = memoizedPrevCards;

                if (newActiveCards.length < newCardsQuantity) {
                    const activeCardsFromNextDiff = newCardsQuantity - newActiveCards.length;

                    const additionalActiveCardsFromNext = memoizedNextCards.filter((_, index) => index < activeCardsFromNextDiff);
                    restNextCards = memoizedNextCards.filter((_, index) => index >= activeCardsFromNextDiff);
                    let activeCardsToCreate = [];
                    let additionalActiveCardsFromPrev = [];

                    if (additionalActiveCardsFromNext.length < activeCardsFromNextDiff) {
                        const activeCardsFromPrevQuantity = activeCardsFromNextDiff - additionalActiveCardsFromNext.length;

                        additionalActiveCardsFromPrev = memoizedPrevCards.filter((_, index) => index < activeCardsFromPrevQuantity);
                        restPrevCards = memoizedPrevCards.filter((_, index) => index >= activeCardsFromPrevQuantity);

                        if (additionalActiveCardsFromPrev.length < activeCardsFromPrevQuantity) {
                            const activeCardsToCreateQuantity = activeCardsFromPrevQuantity - additionalActiveCardsFromPrev.length;

                            activeCardsToCreate = pets
                                .filter((pet) => [...newActiveCards, ...additionalActiveCardsFromNext, ...additionalActiveCardsFromPrev]
                                    .every((item) => item.name !== pet.name))
                                .filter((_, index) => index < activeCardsToCreateQuantity);
                        }

                    }

                    newActiveCards = [...newActiveCards, ...additionalActiveCardsFromNext, ...additionalActiveCardsFromPrev, ...activeCardsToCreate];
                } else if (newActiveCards.length > newCardsQuantity) {
                    newActiveCards = newActiveCards.filter((_, index) => index < newCardsQuantity);
                    restActiveCards = newActiveCards.filter((_, index) => index >= newCardsQuantity);
                }

                let newNextCards = [...restActiveCards, ...restNextCards];

                if (newNextCards.length < newCardsQuantity) {
                    const nextCardsToCreateQuantity = newCardsQuantity - newNextCards.length;

                    const nextCardsToCreate = pets
                        .filter((pet) => [...newActiveCards, ...newNextCards]
                            .every((item) => item.name !== pet.name))
                        .filter((_, index) => index < nextCardsToCreateQuantity);


                    newNextCards = [...newNextCards, ...nextCardsToCreate];
                } else if (newNextCards.length > newCardsQuantity) {
                    newNextCards = newNextCards.filter((_, index) => index < newCardsQuantity);
                }

                let newPrevCards = restPrevCards;

                if (newPrevCards.length < newCardsQuantity) {
                    const prevCardsToCreateQuantity = newCardsQuantity - newPrevCards.length;

                    const prevCardsToCreate = pets
                        .filter((pet) => [...newActiveCards, ...newPrevCards]
                            .every((item) => item.name !== pet.name))
                        .filter((_, index) => index < prevCardsToCreateQuantity);


                    newPrevCards = [...newPrevCards, ...prevCardsToCreate];
                } else if (newPrevCards.length > newCardsQuantity) {
                    newPrevCards = newPrevCards.filter((_, index) => index < newCardsQuantity);
                }

                cards[0].querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
                cards[1].querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
                cards[2].querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));

                newPrevCards.forEach((pet) => {
                    cards[0].appendChild(createCard(pet));
                });
                newActiveCards.forEach((pet) => {
                    cards[1].appendChild(createCard(pet));
                });
                newNextCards.forEach((pet) => {
                    cards[2].appendChild(createCard(pet));
                });
            }

            cardsQuantity = newCardsQuantity;
        }
    };

    buttonRight.forEach((button) => {
        button.addEventListener('click', handleButtonRight);
    });

    buttonLeft.forEach((button) => {
        button.addEventListener('click', handleButtonLeft);
    });

    activeCardsArr.forEach((pet) => {
        cards[1].appendChild(createCard(pet));
    });

    prevCardsArr.forEach((pet) => {
        cards[0].appendChild(createCard(pet));
    });
    nextCardsArr.forEach((pet) => {
        cards[2].appendChild(createCard(pet));
    });

    window.addEventListener('resize', handleResize);
};
