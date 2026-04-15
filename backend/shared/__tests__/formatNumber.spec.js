/**
 * Tests for formatNumber.js
 */

const { formatNumber } = require('../formatNumber');

describe('formatNumber', () => {
  it('should format integer number to two decimal places as string', () => {
    const result = formatNumber(10);
    expect(result).toBe('10.00');
  });

  it('should format float number to two decimal places as string', () => {
    const result = formatNumber(19.8);
    expect(result).toBe('19.80');
  });

  it('should format large number with thousands separator', () => {
    const result = formatNumber(1234.56);
    expect(result).toBe('1,234.56');
  });

  it('should format negative numbers correctly', () => {
    const result = formatNumber(-5.2);
    expect(result).toBe('-5.20');
  });

  it('should format zero correctly', () => {
    const result = formatNumber(0);
    expect(result).toBe('0.00');
  });

  it('should throw error for non-number input', () => {
    expect(() => formatNumber('10')).toThrow();
    expect(() => formatNumber(null)).toThrow();
    expect(() => formatNumber(undefined)).toThrow();
  });
});
