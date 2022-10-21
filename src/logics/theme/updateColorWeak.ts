import { toggleClass } from './util';

/**
 * Change the status of the project's color weakness mode
 * 色弱模式
 * @param colorWeak
 */
export function updateColorWeak(colorWeak: boolean) {
  toggleClass(colorWeak, 'color-weak', document.documentElement);
}
