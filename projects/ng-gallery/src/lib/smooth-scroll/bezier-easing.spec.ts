import bezier from './bezier-easing';

describe('Bezier Easing Function', () => {
  it('should return a function', () => {
    const easingFunction = bezier(0.25, 0.1, 0.25, 1.0);
    expect(typeof easingFunction).toBe('function');
  });

  it('should throw an error if x values are out of range', () => {
    expect(() => bezier(-0.5, 0, 1.5, 1)).toThrowError('bezier x values must be in [0, 1] range');
  });

  it('should return linear easing when control points form a straight line', () => {
    const linear = bezier(0, 0, 1, 1);
    expect(linear(0)).toBe(0);
    expect(linear(0.5)).toBe(0.5);
    expect(linear(1)).toBe(1);
  });

  it('should return values between 0 and 1 for valid input', () => {
    const easingFunction = bezier(0.42, 0, 0.58, 1);
    expect(easingFunction(0)).toBe(0);
    expect(easingFunction(1)).toBe(1);
    expect(easingFunction(0.5)).toBeGreaterThan(0);
    expect(easingFunction(0.5)).toBeLessThan(1);
  });

  it('should correctly approximate a cubic bezier curve', () => {
    const easingFunction = bezier(0.42, 0, 0.58, 1);
    const result = easingFunction(0.25);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  it('should correctly handle extreme bezier curves', () => {
    const easeIn = bezier(0.9, 0, 1, 1);
    const easeOut = bezier(0, 0, 0.1, 1);

    // Fix: easeIn should be less than easeOut at x = 0.5
    expect(easeIn(0.5)).toBeLessThan(easeOut(0.5));
  });
});
