/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';

import './widget.scss';

import { PARSERS } from './constants';

import slizaImage from './assets/images/slizaDock.svg';
import bestspImage from './assets/images/bestsp.png';
import vzakupkeImage from './assets/images/vzakupke.png';

// Очень важная константа, нужна для формирования списка парсеров или ссылок на социальные сети
const parsersForDOM = Object.keys(PARSERS);

function ButtonsList(props) {
  const { left, parsers, onButtonClick } = props;

  return (
    <div>
      {parsersForDOM.map(key => {
        if (parsers.includes(key)) {
          return (
            <div
              key={PARSERS[key].id}
              className="buttonDock"
              style={{
                justifyContent: `flex-${left ? 'start' : 'end'}`
              }}
              onClickCapture={onButtonClick}
            >
              <div
                className="buttonWrapper buttonInList"
                style={{
                  backgroundColor: `${PARSERS[key].color}`
                }}
              >
                <div className={`buttonTooltipCaption buttonTooltipCaption__${left ? 'left' : 'right'}`}>
                  <span>{PARSERS[key].title}</span>
                </div>
                {PARSERS[key].icon === 'slizaImage' && (
                  <img src={slizaImage} alt={PARSERS[key].title} width={50} height={50} />
                )}
                {PARSERS[key].icon === 'bestspImage' && (
                  <img src={bestspImage} alt={PARSERS[key].title} width={50} height={50} />
                )}
                {PARSERS[key].icon === 'vzakupkeImage' && (
                  <img src={vzakupkeImage} alt={PARSERS[key].title} width={50} height={50} />
                )}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

ButtonsList.propTypes = {
  left: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  parsers: PropTypes.array.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default ButtonsList;
