import '../styles/app.scss';
import { popup } from './features/popup.js';
import { pets } from './data';
import { burgerMenu } from './features/burgerMenu';
import { slider } from './features/slider';

window.addEventListener('load', () => {
    popup(pets);
    burgerMenu();
    slider();
})
