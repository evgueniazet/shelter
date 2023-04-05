import '../styles/app.scss';
import { popup } from './features/popup.js';
import { pets } from './data';

window.addEventListener('load', () => {
    popup(pets);
})
