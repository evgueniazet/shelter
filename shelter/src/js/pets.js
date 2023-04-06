import '../styles/pets.scss';
import { popup } from './features/popup.js';
import { pets } from './data';

window.addEventListener('load', () => {
    popup(pets);
})
