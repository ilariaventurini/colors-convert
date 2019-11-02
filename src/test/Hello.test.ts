import { Hello } from '../index'

test('hello carl', () => {
  expect(Hello('Carl')).toBe('Hello Carl');
});