const roundNum = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}
export const convertCmToInch = (cm: number) => {
  return roundNum(cm * 0.39370);
}
export const convertGmToPound = (gm: number) => {
  return roundNum(gm * 0.0022046);
}
export * from './buildSchema';
export * from './testSetup';