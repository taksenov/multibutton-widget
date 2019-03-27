import { PARSERS, FINDER_TIMEOUT } from './constants';
import { loggerFindButtonError } from './logger';

function findButton(parserName) {
  let handle = -1;
  let counter = 0;
  handle = window.setInterval(() => {
    let match = true;
    let button;

    counter += 1;
    if (counter === FINDER_TIMEOUT) {
      loggerFindButtonError(parserName);
      window.clearInterval(handle);
    }

    if (PARSERS[parserName].hideParams.num_1.type === 'id') {
      button = document.getElementById(
        PARSERS[parserName].hideParams.num_1.param
      );
    }
    if (PARSERS[parserName].hideParams.num_1.type === 'class') {
      button = document.querySelector(
        PARSERS[parserName].hideParams.num_1.param
      );
    }

    if (match === true && button) {
      if (button) {
        button.style.display = 'none';
        button.style.visibility = 'hidden';
      }
      window.clearInterval(handle);
    }
  }, 100);
}

const hideWidget = (scriptElement, parserName) => {
  const script = scriptElement;

  script.onload = () => {
    findButton(parserName);
  };
};

export default hideWidget;
