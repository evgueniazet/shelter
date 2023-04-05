export const popup = (pets) => {
    const cards = document.querySelectorAll('.card');
    const closeButton = document.querySelector('.modal-window-button');
    const modalWindow = document.querySelector('.modal-window');
    const body = document.querySelector('.body');

    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            const name = e.currentTarget.querySelector('.card-title').innerText;
            const title = document.querySelector('.modal-window-title');
            const subtitle = document.querySelector('.modal-window-subtitle');
            const description = document.querySelector('.modal-window-description');
            const image = document.querySelector('.modal-window-img');
            const age = document.querySelectorAll('.modal-window-list-text')[0];
            const inoculations = document.querySelectorAll('.modal-window-list-text')[1];
            const diseases = document.querySelectorAll('.modal-window-list-text')[2];
            const parasites = document.querySelectorAll('.modal-window-list-text')[3];

            pets.forEach((item) => {
                if (item.name === name) {
                    title.innerHTML = item.name;
                    subtitle.innerText = `${item.type} - ${item.breed}`;
                    description.innerText = item.description;
                    age.innerHTML = item.age;
                    inoculations.innerHTML = item.inoculations;
                    diseases.innerHTML = item.diseases;
                    parasites.innerHTML = item.parasites;
                    image.src = item.img;
                }
            })
            modalWindow.classList.add("modal-window-active");
            body.classList.add('body-inactive');

        });
    })

    closeButton.addEventListener('click', () => {
        modalWindow.classList.remove("modal-window-active");
        body.classList.remove('body-inactive');
    })

    modalWindow.addEventListener('click', (e) => {
        if (e.srcElement.className === 'modal-window modal-window-active') {
            modalWindow.classList.remove("modal-window-active");
            body.classList.remove('body-inactive');
        }
    })
};