import { EmployeesClass } from "./plugin.employees";

/**
 *
 * @param  {Object}  settings
 * @param  {String}  settings.model    model gpt-3.5-turbo, text-davinci-003
 * @param  {Array}   settings.temperature  0
 * @param  {Integer} settings.apiKey     your api key opena
 * @returns
 */
export const init = (settings = {}) => {
  return new EmployeesClass(settings);
};
