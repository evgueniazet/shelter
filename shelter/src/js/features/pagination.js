import { createCard } from "../utils/createCard";
import { shuffleArray } from "../utils/shuffleArray";
import { pets } from "../data";

export const pagination = () => {
    const cardsContainer = document.querySelector('.cards-container');
    const cardsButton = document.querySelectorAll('.cards-button');
    let count = 1;
    let petsArr = [];

    cardsButton[0].classList.add('cards-button-inactive');
    cardsButton[1].classList.add('cards-button-inactive');

    const initialWidth = document.body.offsetWidth;

    shuffleArray(pets);

    for (let i = 0; i < 6; i++) {

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

    const handleResize = () => {
        const width = document.body.offsetWidth;
        const newPagesQuantity = getPagesQuantity(width);
        const newPetsOnPageQuantity = getPetsOnPageQuantity(width);

        if (petsOnPageQuantity !== newPetsOnPageQuantity) {
            const firstCurrentCardIndex = (count - 1) * petsOnPageQuantity;
            let firstCardIndex = firstCurrentCardIndex;
            const devisionRest = firstCurrentCardIndex % newPetsOnPageQuantity;

            if (devisionRest) {
                firstCardIndex = firstCardIndex - devisionRest;
            }

            const lastCardIndex = firstCardIndex + newPetsOnPageQuantity;
            count = firstCardIndex === 0 ? 1 : firstCardIndex / newPetsOnPageQuantity + 1;

            cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
            drawCards(firstCardIndex, lastCardIndex, petsArr, cardsContainer);

            petsOnPageQuantity = newPetsOnPageQuantity;
            pagesQuantity = newPagesQuantity;
            cardsButton[2].innerText = count;
        }
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

    const drawCards = (startIndex, endIndex, arr, targetElement) => {
        const pets = arr.slice(startIndex, endIndex);
        pets.forEach((item) => targetElement.appendChild(createCard(item)));
    };


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

    let pagesQuantity = getPagesQuantity(initialWidth);
    let petsOnPageQuantity = getPetsOnPageQuantity(initialWidth);
    cardsButton[2].innerText = count;

    drawCards(0, petsOnPageQuantity, petsArr, cardsContainer);

    cardsButton[0].addEventListener('click', () => {
        cardsButton[2].innerText = 1;
        count = 1;
        cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
        drawCards(0, petsOnPageQuantity, petsArr, cardsContainer);
        inactivateLeftButtons();
        activateRightButtons();
    })

    cardsButton[1].addEventListener('click', () => {
        if (count > 1) {
            count--;
            cardsButton[2].innerText = count;
            cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
            const startIndex = (count - 1) * petsOnPageQuantity;
            const endIndex = count * petsOnPageQuantity;
            drawCards(startIndex, endIndex, petsArr, cardsContainer);
        } else if (count  == 1) {
            cardsButton[2].innerText = count;
            activateRightButtons();
            inactivateLeftButtons();
        }
    })

    cardsButton[3].addEventListener('click', () => {
        if (count < pagesQuantity) {
            count++;
            activateLeftButtons();
            cardsButton[2].innerText = count;
            cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));

            const startIndex = (count - 1) * petsOnPageQuantity;
            const endIndex = count * petsOnPageQuantity;
            drawCards(startIndex, endIndex, petsArr, cardsContainer);
        } else if (count == pagesQuantity) {
            cardsButton[2].innerText = count;
            activateLeftButtons()
            inactivateRightButtons();
        }
    })

    cardsButton[4].addEventListener('click', () => {
        cardsButton[2].innerText = pagesQuantity;
        count = pagesQuantity;
        cardsContainer.querySelectorAll('.card').forEach((item) => item.parentNode.removeChild(item));
        const startIndex = petsArr.length - petsOnPageQuantity;
        const endIndex = count * petsOnPageQuantity;
        drawCards(startIndex, endIndex, petsArr, cardsContainer);
        activateLeftButtons();
        inactivateRightButtons();
    })

    window.addEventListener('resize', handleResize);

};