import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import "./src/i18n";

// Полифилы для Node.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (!HTMLElement.prototype.hasPointerCapture) {
  HTMLElement.prototype.hasPointerCapture = () => false;
}
if (!HTMLElement.prototype.setPointerCapture) {
  HTMLElement.prototype.setPointerCapture = () => {};
}
if (!HTMLElement.prototype.releasePointerCapture) {
  HTMLElement.prototype.releasePointerCapture = () => {};
}
if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = () => {};
}
