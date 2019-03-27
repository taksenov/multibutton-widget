/* eslint-disable no-console */
export const loggerSettingsError = () => {
  console.error(
    'SLIZA: Обнаружены некорректные настройки скрипта: скопируйте настройки из вашего личного кабинета или обратитесь в техподдержку'
  );
};

export const loggerFindButtonError = parserName => {
  console.error(
    'SLIZA: Элемент не найден за указанное время, сообщите в техподдержку ID:',
    parserName
  );
};
