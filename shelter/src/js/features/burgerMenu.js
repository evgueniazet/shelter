export const burgerMenu = () => {
    const burger = document.querySelector('.header-burger');
    const navigation = document.querySelector('.header-burger-nav');
    const body = document.querySelector('.body');
    const burgerLink = document.querySelectorAll('.header-burger-link');
    const allowableWidth = 768;
    const shadow = document.querySelector('.shadow');

    const addBurgerMenu = () => {
        navigation.classList.add('header-burger-nav-active');
        burger.classList.add('header-burger-active');
        body.classList.add('body-inactive');
    };

    const removeBurgerMenu = () => {
        burger.classList.remove('header-burger-active');
        navigation.classList.remove('header-burger-nav-active');
        body.classList.remove('body-inactive');
    }

    const handleBurgerClick = () => {
        if (navigation.classList.contains('header-burger-nav-active')) {
            removeBurgerMenu();
            shadow.classList.remove('shadow-active');

        } else {
            addBurgerMenu();
            shadow.classList.add('shadow-active');
        }
    };

    const handleBurgerLinkClick = () => {
        removeBurgerMenu();
        shadow.classList.remove('shadow-active');
    };

    window.addEventListener('resize', () => {
        window.innerWidth;
        if (window.innerWidth > allowableWidth) {
            removeBurgerMenu();
        }
    });

    burger.addEventListener('click', handleBurgerClick);

    burgerLink.forEach((link) => {
        link.addEventListener('click', handleBurgerLinkClick);
    })

    shadow.addEventListener('click', () => {
        removeBurgerMenu();
        shadow.classList.remove('shadow-active');
    })
};