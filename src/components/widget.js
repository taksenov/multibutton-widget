/* eslint-disable object-curly-newline */
/* eslint-disable indent */
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import MainButton from './mainButtonJSX';
import ButtonsList from './buttonsListJSX';

import { SLIZA_PARSER, BESTSP_PARSER, VZAKUPKE_PARSER, PARSERS, MARGINS_FROM_BORDERS } from './constants';
import { loggerSettingsError } from './logger';
import hideWidget from './hideWidgets';

import slizaImage from './assets/images/slizaDock.svg';
import closeImage from './assets/images/close.svg';
import './widget.scss';

/**
 * Основной класс виджета, в котором происходит вся обработка
 *
 * @class Widget
 * @extends {Component}
 */
class Widget extends Component {
  /**
   * Creates an instance of Widget.
   * @param {*} props
   * @memberof Widget
   */
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      showDock: true,
      left: false,
      parsers: []
    };
  }

  /**
   * ComponentDidMount()
   *
   * @returns
   * @memberof Widget
   */
  componentDidMount() {
    const thisScript = document.querySelector('[data-name-script="sliza"]');
    let parsers;
    if (!thisScript) {
      loggerSettingsError();
      parsers = JSON.parse(`["${SLIZA_PARSER}"]`);
      return;
    }

    // IDEA: Здесь создаются пустые скрипты и стили под все поддерживаемые виджетом парсеры
    // Sliza
    const scriptSliza = document.createElement('script');
    // Best SP
    const scriptBestSP = document.createElement('script');
    // ВЗакупке
    const scriptVZakupke = document.createElement('script');
    const cssVZakupke = document.createElement('link');

    // Парсер sliza.ru будет всегда
    if (typeof thisScript.dataset.setParsers === 'undefined') {
      parsers = JSON.parse(`["${SLIZA_PARSER}"]`);
    } else {
      parsers = JSON.parse(thisScript.dataset.setParsers);
    }
    // Добавим парсеры в стейт компонента
    this.setState({ parsers: [...parsers] });

    // Проверка на то с какой стороны сайта располагать кнопку, по умолчанию "справа"
    const isUndefined = typeof thisScript.dataset.direction;
    if (isUndefined === 'undefined') {
      this.setState({ left: false });
    }
    if (isUndefined !== 'undefined' && thisScript.dataset.direction !== 'left') {
      this.setState({ left: false });
    }
    if (isUndefined !== 'undefined' && thisScript.dataset.direction === 'left') {
      this.setState({ left: true });
    }

    // Настройка скриптов с учетом специфики каждого парсера,
    // запуск и скрытие на сайте кнопок скриптов
    parsers.map(item => {
      switch (item) {
        // BestSP
        case BESTSP_PARSER:
          scriptBestSP.src = PARSERS[item].script.src;
          scriptBestSP.setAttribute(
            PARSERS[item].script.dataAttributes.dataMain.name,
            PARSERS[item].script.dataAttributes.dataMain.value
          );
          document.body.appendChild(scriptBestSP);
          hideWidget(scriptBestSP, BESTSP_PARSER);
          break;
        // ВЗакупке
        case VZAKUPKE_PARSER:
          scriptVZakupke.type = PARSERS[item].script.type;
          scriptVZakupke.src = PARSERS[item].script.src;
          scriptVZakupke.setAttribute(
            PARSERS[item].script.dataAttributes.position.name,
            PARSERS[item].script.dataAttributes.position.value
          );
          cssVZakupke.href = PARSERS[item].css.href;
          cssVZakupke.rel = PARSERS[item].css.rel;
          document.body.appendChild(scriptVZakupke);
          document.body.appendChild(cssVZakupke);
          hideWidget(scriptVZakupke, VZAKUPKE_PARSER);
          break;
        // Sliza
        case SLIZA_PARSER:
          scriptSliza.type = PARSERS[item].script.type;
          scriptSliza.src = PARSERS[item].script.src;
          scriptSliza.async = PARSERS[item].script.async;
          scriptSliza.defer = PARSERS[item].script.defer;
          document.body.appendChild(scriptSliza);
          hideWidget(scriptSliza, SLIZA_PARSER);
          break;
        default:
          return false;
      }
      return true;
    });
  }

  componentDidUpdate() {
    // let slizaButton = document.getElementById('sliza-wgt-button');
    // // console.log('CDU slizaButto=', slizaButton);
    // let event = new Event('click');
    // if (slizaButton) slizaButton.style.display = 'block';
    // if (slizaButton) slizaButton.dispatchEvent(event);
  }

  handleButtonClick = e => {
    console.log('handleButtonClick e=', e);
    console.log('handleButtonClick e.nativeEvent=', e.nativeEvent);
    console.log('handleButtonClick e.target=', e.target);

    // let slizaButton = document.getElementById('sliza-wgt-button');
    // let event = new Event('click');
    // if (slizaButton) slizaButton.style.display = 'block';
    // if (slizaButton) slizaButton.dispatchEvent(event);
  };

  handleToggleOpen = () => {
    this.setState(prev => {
      let { showDock } = prev;
      if (!prev.opened) {
        showDock = false;
      }
      return {
        showDock,
        opened: !prev.opened
      };
    });
  };

  handleWidgetExit = () => {
    this.setState({
      showDock: true
    });
  };

  renderBody = () => {
    const { showDock, left } = this.state;

    if (showDock) {
      return (
        <MainButton
          left={left}
          image={slizaImage}
          handleToggleOpen={this.handleToggleOpen}
          backgroundColor="#DD9021"
          altText="sliza.ru"
        />
      );
    }
    return null;
  };

  render() {
    const body = this.renderBody();
    const { opened, left, parsers } = this.state;

    return (
      <div
        className="docked-widget"
        style={
          left
            ? {
                left: `${MARGINS_FROM_BORDERS}px`
              }
            : {
                right: `${MARGINS_FROM_BORDERS}px`
              }
        }
      >
        <Transition in={opened} timeout={250} onExited={this.handleWidgetExit}>
          {status => (
            <div className={`widget widget-${status}`}>
              {/* Body List */}
              <ButtonsList left={left} parsers={parsers} onButtonClick={this.handleButtonClick} />

              {/* Close Button */}
              <MainButton
                left={left}
                image={closeImage}
                handleToggleOpen={this.handleToggleOpen}
                backgroundColor="#969696"
                altText="Close"
              />
            </div>
          )}
        </Transition>
        {body}
      </div>
    );
  }
}

export default Widget;
