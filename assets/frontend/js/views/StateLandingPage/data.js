import CaliforniaHeroBg from './img/california_hero_bg.png';
import CaliforniaHeroStates from './img/california_hero_states.png';
import CaliforniaCars from './img/california_cars.png';
import TexasHeroBg from './img/texas_hero_bg.png';
import TexasHeroStates from './img/texas_hero_states.png';
import TexasCars from './img/texas_cars.png';
import FloridaHeroBg from './img/florida_hero_bg.png';
import FloridaHeroStates from './img/florida_hero_states.png';
import FloridaCars from './img/florida_cars.png';

const data = {
  california: {
    heroImg: CaliforniaHeroBg,
    heroStatesImg: CaliforniaHeroStates,
    carsImg: CaliforniaCars,
    titleKey: 'stateLandingPage.heroTitle.ca',
  },
  texas: {
    heroImg: TexasHeroBg,
    heroStatesImg: TexasHeroStates,
    carsImg: TexasCars,
    titleKey: 'stateLandingPage.heroTitle.tx',
  },
  florida: {
    heroImg: FloridaHeroBg,
    heroStatesImg: FloridaHeroStates,
    carsImg: FloridaCars,
    titleKey: 'stateLandingPage.heroTitle.fl',
  },
};

export default data;
