import { createCard } from "../utils/createCard";
import { shuffleArray } from "../utils/shuffleArray";
import { pets } from "../data";

export const pagination = () => {
    const cardsContainer = document.querySelector('.cards-container');
    const cardsButton = document.querySelectorAll('.cards-button');
    let count = 1;
    let petsArr = [];

    if (count === 1) {
        cardsButton[0].classList.add('cards-button-inactive');
        cardsButton[1].classList.add('cards-button-inactive');
    }

    const initialWidth = document.body.offsetWidth;

    const handleResize = () => {
        const width = document.body.offsetWidth;
        getPagesQuantity(width);
        getPetsOnPageQuantity(width);
        console.log('pagesQuantity', pagesQuantity);
        cardsButton[2].innerText = pagesQuantity;
    };

    const getPagesQuantity = (width) => {
        if (width > 1075) {
            return 6;
        } else if (width > 595 && width <= 1075) {
            return 8;
        } else if (width <= 595) {
            return 16;
        }
    };

    const getPetsOnPageQuantity = (width) => {
        if (width > 1075) {
            return 8;
        } else if (width > 595 && width <= 1075) {
            return 6;
        } else if (width <= 595) {
            return 3;
        }
    };

    const pagesQuantity = getPagesQuantity(initialWidth);
    const petsOnPageQuantity = getPetsOnPageQuantity(initialWidth);

    for (let i = 0; i < 6; i++) {

        shuffleArray(pets);

        const sliceArr = (arr, size) => {
            const res = [];
            for (let i = 0; i < arr.length; i += size) {
                const chunk = arr.slice(i, i + size);
                res.push(chunk);
            }
            return res;
        };

        const slicedArray = sliceArr(pets, 3);

        slicedArray.forEach((array) => {
            shuffleArray(array);
            array.forEach((elem) => {
                petsArr.push(elem);
            })
        })
    }

    const drawInitialCards = () => {
        const initialArr = petsArr.slice(0, petsOnPageQuantity);
        initialArr.forEach((item) => cardsContainer.appendChild(createCard(item)));
    };

    drawInitialCards();

    const drawCards = (quantity) => {
        const number = cardsButton[2].innerText;
        const startIndex = (number - 1) * quantity;
        const endIndex = number * quantity;
        const drawPets = petsArr.slice(startIndex, endIndex);
        drawPets.forEach((item) => cardsContainer.appendChild(createCard(item)));
    };

    const drawLastCards = (quantity) => {
        const number = cardsButton[2].innerText;
        const startIndex = petsArr.length - quantity;
        const endIndex = number * quantity;
        const drawPets = petsArr.slice(startIndex, endIndex);
        drawPets.forEach((item) => cardsContainer.appendChild(createCard(item)));
    };

    cardsButton[2].innerText = count;

    const activateLeftButtons = () => {
        cardsButton[0].classList.remove('cards-button-inactive');
        cardsButton[1].classList.remove('cards-button-inactive');
    };

    const activateRightButtons = () => {
        cardsButton[3].classList.remove('cards-button-inactive');
        cardsButton[4].classList.remove('cards-button-inactive');
    };

    const inactivateLeftButtons = () => {
        cardsButton[0].classList.add('cards-button-inactive');
        cardsButton[1].classList.add('cards-button-inactive');
    };

    const inactivateRightButtons = () => {
        cardsButton[3].classList.add('cards-button-inactive');
        cardsButton[4].classList.add('cards-button-inactive');
    };

    cardsButton[0].addEventListener('click', () => {
        cardsButton[2].innerText = 1;
        count = 1;
        cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
        drawInitialCards();
        inactivateLeftButtons();
        activateRightButtons();
    })

    cardsButton[1].addEventListener('click', () => {
        if (cardsButton[2].innerText > 1) {
            count = count - 1;
            cardsButton[2].innerText = count;
            cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
            drawCards(petsOnPageQuantity);
        } else if (cardsButton[2].innerText == 1) {
            inactivateLeftButtons();
            activateRightButtons();
        }
    })

    cardsButton[3].addEventListener('click', () => {
        if (cardsButton[2].innerText < pagesQuantity) {
            count++;
            activateLeftButtons();
            cardsButton[2].innerText = count;
            cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
            drawCards(petsOnPageQuantity);
        } else if (cardsButton[2].innerText == pagesQuantity) {
            activateLeftButtons()
            inactivateRightButtons();
            cardsButton[3].disabled = true;
            cardsButton[4].disabled = true;
        }
    })

    cardsButton[4].addEventListener('click', () => {
        cardsButton[2].innerText = pagesQuantity;
        count = pagesQuantity;
        cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
        drawLastCards(petsOnPageQuantity);
        activateLeftButtons();
        inactivateRightButtons();
    })

    window.addEventListener('resize', handleResize);

};