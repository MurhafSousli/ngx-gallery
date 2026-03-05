import { numberAttribute } from '@angular/core';

export function itemsPerViewTransform(v: string | number): number {
  return Math.max(1, numberAttribute(v, 1)); // Enforce >= 1
}

export function gapTransform(v: string | number): number {
  // Allow 0, but handle null/undefined
  if (v === null || v === undefined || v === '') return 0;
  const num = typeof v === 'number' ? v : parseFloat(v);
  // If it's not a number, or negative, default to 0
  if (isNaN(num) || num < 0) return 0;
  return num;
}

export function itemSizeTransform(v: string | number): string {
  if (v === 'auto') return 'auto';
  if (!v) return undefined;
  const num = typeof v === 'number' ? v : parseFloat(v);
  if (isNaN(num) || num <= 0) return undefined;
  return `${ num }px`;
}

export function stepsTransform(v: string | number): number | 'page' {
  if (v === 'page') return 'page';
  if (!v) return undefined;
  const num = typeof v === 'number' ? v : parseFloat(v);
  if (isNaN(num) || num <= 0) return undefined;
  return num;
}
