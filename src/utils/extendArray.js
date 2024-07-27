/**
 * @returns {number[]}
 * **/
const extendArray = (array = [0], length = 0) => [
	...array,
	...new Array(Math.max(length - array.length, 0)).fill(0),
];

export {extendArray};
