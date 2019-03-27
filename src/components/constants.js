/* eslint-disable object-curly-newline */
// IDEA: для создания ключа используется логика:
// 1) берем название нового парсера, например 'slizaParser'
// 2) Переходим на сайт https://www.base64encode.org/
// 3) Кодируем значение на кнопку >ENCODE<
// 4) Полученное значение добавляем в виде константы,
// а так же называем этим именем свойство в объекте PARSERS
// export const SLIZA_PARSER = 'c2xpemFQYXJzZXI=';
export const SLIZA_PARSER = 'c2xpemFQYXJzZXI=';
export const BESTSP_PARSER = 'YmVzdHNwUGFyc2Vy';
export const VZAKUPKE_PARSER = 'dnpha3Vwa2VQYXJzZXI=';

// Устанавливает время, сколько будет происходить поиск кнопки парсера на странице
// Формула: FINDER_TIMEOUT * 100ms = Время таймаута в милисекундах
export const FINDER_TIMEOUT = 40;

// Стилизация
export const MARGINS_FROM_BORDERS = 20;

// Настроечный объект для парсеров
// В именах свойств заложена логика кеширования через
// Object pool, что позволяет ускорить время доступа к
// свойствам объектов без перебора значений
export const PARSERS = {
  // Sliza
  'c2xpemFQYXJzZXI=': {
    id: 1,
    title: 'Sliza',
    icon: 'slizaImage',
    domain: 'sliza.ru',
    color: '#DD9021',
    script: {
      type: 'text/javascript',
      src: 'https://sliza.ru/wgt/widget.php',
      code: '',
      async: false,
      defer: false,
      dataAttributes: {}
    },
    hideParams: {
      num_1: { type: 'id', param: 'sliza-wgt-button' }
    }
  },
  // BestSP
  YmVzdHNwUGFyc2Vy: {
    id: 2,
    title: 'BestSP',
    icon: 'bestspImage',
    domain: 'bestsp.ru',
    color: '#FFFFFF',
    script: {
      type: '',
      src: 'https://bestsp.ru/embed/widget.js',
      code: '',
      async: false,
      defer: false,
      dataAttributes: {
        dataMain: {
          name: 'data-main',
          value: 'js/main'
        }
      }
    },
    hideParams: {
      num_1: {
        type: 'class',
        param: '.bestsp_widget__action__button'
      }
    }
  },
  // VZakupke
  'dnpha3Vwa2VQYXJzZXI=': {
    id: 3,
    title: 'VZakupke',
    icon: 'vzakupkeImage',
    domain: 'bestsp.ru',
    color: '#695795',
    script: {
      type: 'text/javascript',
      src: 'https://vzakupke.com/widget/assets/js/initSiteWidget.js',
      code: '',
      async: false,
      defer: false,
      dataAttributes: {
        position: {
          name: 'position',
          value: 'right-bottom'
        }
      }
    },
    css: {
      href: 'https://vzakupke.com/widget/assets/css/widget.css',
      rel: 'stylesheet'
    },
    hideParams: {
      num_1: {
        type: 'id',
        param: 'vz-widget-btn'
      }
    }
  }
};
