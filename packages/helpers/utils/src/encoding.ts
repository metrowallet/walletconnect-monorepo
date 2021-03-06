import BN from "bn.js";

import * as encUtils from "enc-utils";
import { addHexPrefix, removeHexPrefix, sanitizeHex } from "./misc";

// -- ArrayBuffer ------------------------------------------ //

export function convertArrayBufferToBuffer(arrBuf: ArrayBuffer): Buffer {
  return encUtils.arrayToBuffer(new Uint8Array(arrBuf));
}

export function convertArrayBufferToUtf8(arrBuf: ArrayBuffer): string {
  return encUtils.arrayToUtf8(new Uint8Array(arrBuf));
}

export function convertArrayBufferToHex(arrBuf: ArrayBuffer, noPrefix?: boolean): string {
  return encUtils.arrayToHex(new Uint8Array(arrBuf), !noPrefix);
}

export function convertArrayBufferToNumber(arrBuf: ArrayBuffer): number {
  return convertHexToNumber(encUtils.arrayToHex(new Uint8Array(arrBuf)));
}

export function concatArrayBuffers(...args: ArrayBuffer[]): ArrayBuffer {
  return encUtils.hexToArray(args.map(b => encUtils.arrayToHex(new Uint8Array(b))).join("")).buffer;
}

// -- Buffer ----------------------------------------------- //

export function convertBufferToArrayBuffer(buf: Buffer): ArrayBuffer {
  return encUtils.bufferToArray(buf).buffer;
}

export function convertBufferToUtf8(buf: Buffer): string {
  return encUtils.bufferToUtf8(buf);
}

export function convertBufferToHex(buf: Buffer, noPrefix?: boolean): string {
  return encUtils.bufferToHex(buf, !noPrefix);
}

export function convertBufferToNumber(buf: Buffer): number {
  return encUtils.bufferToNumber(buf);
}

export function concatBuffers(...args: Buffer[]): Buffer {
  return encUtils.concatBuffers(...args);
}

// -- Utf8 ------------------------------------------------- //

export function convertUtf8ToArrayBuffer(utf8: string): ArrayBuffer {
  return encUtils.utf8ToArray(utf8).buffer;
}

export function convertUtf8ToBuffer(utf8: string): Buffer {
  return encUtils.utf8ToBuffer(utf8);
}

export function convertUtf8ToHex(utf8: string, noPrefix?: boolean): string {
  return encUtils.utf8ToHex(utf8, !noPrefix);
}

export function convertUtf8ToNumber(utf8: string): number {
  return new BN(utf8, 10).toNumber();
}

// -- Hex -------------------------------------------------- //

export function convertHexToBuffer(hex: string): Buffer {
  return encUtils.hexToBuffer(hex);
}

export function convertHexToArrayBuffer(hex: string): ArrayBuffer {
  return encUtils.hexToArray(hex).buffer;
}

export function convertHexToUtf8(hex: string): string {
  return encUtils.hexToUtf8(hex);
}

export function convertHexToNumber(hex: string): number {
  return new BN(removeHexPrefix(hex), "hex").toNumber();
}

// -- Number ----------------------------------------------- //

export function convertNumberToBuffer(num: number): Buffer {
  return encUtils.hexToBuffer(convertNumberToHex(num));
}

export function convertNumberToArrayBuffer(num: number): ArrayBuffer {
  return encUtils.hexToArray(convertNumberToHex(num));
}

export function convertNumberToUtf8(num: number): string {
  return new BN(num).toString();
}

export function convertNumberToHex(num: number | string, noPrefix?: boolean): string {
  const hex = removeHexPrefix(sanitizeHex(new BN(num).toString(16)));
  return noPrefix ? hex : addHexPrefix(hex);
}
