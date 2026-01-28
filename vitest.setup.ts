import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { TextDecoder, TextEncoder } from "util";
import { afterEach } from "vitest";

import "./src/i18n";

afterEach(() => {
  cleanup();
});

// Полифилы для Node.js
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

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
