import {extendArrayToMultipleOfFour} from '../utils/extendArrayToMultipleOfFour.js';
import {Vector3Utils} from '../math/Vector3Utils.js';

// prettier-ignore
const firstFace = [[0, 1, 0], [-1, -1, 1], [1, -1, 1]]
const firstNormal = Vector3Utils.computeNormal(...firstFace);
// prettier-ignore
const secondFace = [[0, 1, 0], [0, -1, -1], [-1, -1, 1]];
const secondNormal = Vector3Utils.computeNormal(...secondFace);
// prettier-ignore
const thirdFace = [[0, 1, 0], [1, -1, 1], [0, -1, -1]];
const thirdNormal = Vector3Utils.computeNormal(...thirdFace);

// prettier-ignore
const vertex = extendArrayToMultipleOfFour([
		...firstFace[0],						...firstNormal,
		...firstFace[1],						...firstNormal,
		...firstFace[2],						...firstNormal,
		...secondFace[0],						...secondNormal,
		...secondFace[1],					 	...secondNormal,
		...secondFace[2],					 	...secondNormal,
		...thirdFace[0],						...thirdNormal,
		...thirdFace[1],					 	...thirdNormal,
		...thirdFace[2],					 	...thirdNormal,
])

// prettier-ignore
const index = extendArrayToMultipleOfFour([
	0, 1, 2, 3, 4, 5, 6, 7, 8
])

/**
 * @type {GeometryData}
 */
const TETRAHEDRON_DATA = {
	vertex: new Float32Array(vertex),
	index: new Uint16Array(index),
};

export {TETRAHEDRON_DATA};
