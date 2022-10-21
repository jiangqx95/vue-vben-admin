import { toggleClass } from './util';

/**
 * Change project gray mode status
 * 灰色模式
 * @param gray
 */
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement);
}
