import { createCard } from "../utils/createCard";
import { shuffleArray } from "../utils/shuffleArray";
import { pets } from "../data";


export const pagination = () => {
    const cardsContainer = document.querySelector('.cards-container');
    const cardsButton = document.querySelectorAll('.cards-button');
    let count = 1;

    const initialWidth = document.body.offsetWidth;

    const getPagesQuantity = (width) => {
        if (width > 1075) {
            return 6;
        } else if (width > 595 && width <= 1075) {
            return 8;
        } else if (width <= 595) {
            return 16;
        }
    };

    // const getPetsOnPageQuantity = (width) => {
    //     if (width > 1075) {
    //         return 8;
    //     } else if (width > 595 && width <= 1075) {
    //         return 6;
    //     } else if (width <= 595) {
    //         return 3;
    //     }
    // };

    // const petsOnPage = getPetsOnPageQuantity(initialWidth);

    // console.log('petsOnPage', petsOnPage);

    const pagesQuantity = getPagesQuantity(initialWidth);



    // const createPetsArray = () => {
    //     let petsCopy = [...pets];
    //     for (let i = 0; i < 6; i++) {
    //         shuffleArray(petsCopy);
    //         console.log('petsCopy', petsCopy);
    //     }
    // };
    // const petsArray = createPetsArray();
    // console.log('petsArray', petsArray);

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
    console.log('slicedArray', slicedArray);


    const shuffleSliceArr = (arr) => {
        arr.forEach((item) => { shuffleArray(item) })
    };

    shuffleSliceArr(slicedArray);

    console.log('shuffledSliceArr', slicedArray);



    pets.forEach((item) => cardsContainer.appendChild(createCard(item)));

    cardsButton[2].innerText = count;

    cardsButton[0].addEventListener('click', () => {
        cardsButton[2].innerText = 1;
        count = 1;
    })

    cardsButton[1].addEventListener('click', () => {
        if (cardsButton[2].innerText > 1) {
            count = count - 1;
            cardsButton[2].innerText = count;
        } else {
        }
    })

    cardsButton[3].addEventListener('click', () => {
        if (cardsButton[2].innerText < pagesQuantity) {
            count++;
            cardsButton[2].innerText = count;
        } else {
        }
    })

    cardsButton[4].addEventListener('click', () => {
        cardsButton[2].innerText = pagesQuantity;
        count = pagesQuantity;
    })
};