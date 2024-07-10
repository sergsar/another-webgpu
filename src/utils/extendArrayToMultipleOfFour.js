const extendArrayToMultipleOfFour = (array = [0]) => [
	...array,
	...new Array(Math.ceil(array.length / 4) * 4 - array.length).fill(0),
];

export {extendArrayToMultipleOfFour};
