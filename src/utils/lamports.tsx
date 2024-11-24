import { abbreviatedNumber, lamportsToSol } from '.';

export function displayLamports(value: number | bigint) {
  return abbreviatedNumber(lamportsToSol(value));
}
