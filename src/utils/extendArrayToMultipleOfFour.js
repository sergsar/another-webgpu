import {extendArray} from './extendArray.js';

const extendArrayToMultipleOfFour = (array = [0]) =>
	extendArray(array, Math.ceil(array.length / 4) * 4);

export {extendArrayToMultipleOfFour};
