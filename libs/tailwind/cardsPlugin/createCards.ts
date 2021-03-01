import { CSSProperties } from 'react';

import addDepthClasses from './addDepthClasses';
import addSubClasses from './addSubClasses';
import { TailwindOptionsPartial, TailwindComponents } from './types';
import addOpacity from '../utils/addOpacity';

/**
 * Creates somewhat opinionated 3d card components
 * @param param0 object containing Tailwind plugin function parameters
 *
 */
const createCards = ({ addComponents, theme }: TailwindOptionsPartial) => {
  // get config data
  const transformMatrix =
    theme('cards.transformMatrix') || 'matrix(1, 0, 0, 1, 0, 0)';
  const variants = {
    white: {
      base: '#FFFFFF',
      shadow: '#D5DFE9',
    },
    ...theme('cards.variants'),
  };

  // creates base subclasses as well as color variants
  const subClasses = addSubClasses({ theme });

  // adds depth effect using shadow
  const componentsWithDepth = addDepthClasses({
    variants,
    addComponents,
  });

  // create components
  let cardComponents = {
    '.skew': {
      transformStyle: 'preserve-3d',
    },
  } as TailwindComponents;

  Object.keys(componentsWithDepth).forEach((variant) => {
    cardComponents[`.card-${variant}`] = {
      backgroundColor: componentsWithDepth[variant].base,
      transition: 'all .3s ease',
      [`@apply ${componentsWithDepth[variant].depths.fill.slice(1)}`]: {},
    } as CSSProperties;

    cardComponents[`.card-${variant}-transparent`] = {
      backgroundColor: addOpacity(componentsWithDepth[variant].base, 0.15),
      transition: 'all .3s ease',
      [`@apply ${componentsWithDepth[variant].depths.transparent.slice(
        1
      )}`]: {},
    } as CSSProperties;
  });

  addComponents({ ...cardComponents, ...subClasses });
};

export default createCards;
