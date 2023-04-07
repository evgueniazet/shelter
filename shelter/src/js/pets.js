import '../styles/pets.scss';
import { popup } from './features/popup.js';
import { pets } from './data';
import { burgerMenu } from './features/burgerMenu';

window.addEventListener('load', () => {
    popup(pets);
    burgerMenu();
})