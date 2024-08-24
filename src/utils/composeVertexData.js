import {ArrayUtils} from './ArrayUtils.js';

/**
 * @param {Object} params
 * @param {number[]} params.positions
 * @param {number[]} [params.normals]
 * @returns number[]
 */
const composeVertexData = ({positions, normals}) => {
	/** @type {number[]} **/
	const result = [];
	for (let i = 0; i < positions.length; i = i + 3) {
		const item = [positions, normals]
			.filter(Boolean)
			.map(array => array.slice(i, i + 3))
			.reduce((acc, curr) => [...acc, ...curr], []);
		result.push(...item);
	}
	return ArrayUtils.extendArrayToMultipleOfFour(result);
};

export {composeVertexData};
