import '../styles/pets.scss';
import { popup } from './features/popup.js';
import { pets } from './data';
import { burgerMenu } from './features/burgerMenu';
import { pagination } from './features/pagination';

window.addEventListener('load', () => {
    popup(pets);
    burgerMenu();
    pagination();
})