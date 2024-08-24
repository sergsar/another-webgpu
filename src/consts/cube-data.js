import {composeVertexData} from '../utils/composeVertexData.js';

// prettier-ignore
const positions = [
	// front face
	-1,  1,  1,
	-1, -1,  1,
	1,  1,  1,
	1, -1,  1,
	// right face
	1,  1, -1,
	1,  1,  1,
	1, -1, -1,
	1, -1,  1,
	// back face
	1,  1, -1,
	1, -1, -1,
	-1,  1, -1,
	-1, -1, -1,
	// left face
	-1,  1,  1,
	-1,  1, -1,
	-1, -1,  1,
	-1, -1, -1,
	// bottom face
	1, -1,  1,
	-1, -1,  1,
	1, -1, -1,
	-1, -1, -1,
	// top face
	-1,  1,  1,
	1,  1,  1,
	-1,  1, -1,
	1,  1, -1,
]

// prettier-ignore
const normals = [
	// front face
	0,  0,  1,
	0,  0,  1,
	0,  0,  1,
	0,  0,  1,
	// right face
	1,  0,  0,
	1,  0,  0,
	1,  0,  0,
	1,  0,  0,
	// back face
	0,  0, -1,
	0,  0, -1,
	0,  0, -1,
	0,  0, -1,
	// left face
	-1,  0,  0,
	-1,  0,  0,
	-1,  0,  0,
	-1,  0,  0,
	// bottom face
	0, -1,  0,
	0, -1,  0,
	0, -1,  0,
	0, -1,  0,
	// top face
	0,  1,  0,
	0,  1,  0,
	0,  1,  0,
	0,  1,  0,
];

const vertex = new Float32Array(composeVertexData({positions, normals}));

// prettier-ignore
const index = new Uint16Array([
	0,  1,  2,  2,  1,  3,  // front
	4,  5,  6,  6,  5,  7,  // right
	8,  9, 10, 10,  9, 11,  // back
	12, 13, 14, 14, 13, 15,  // left
	16, 17, 18, 18, 17, 19,  // bottom
	20, 21, 22, 22, 21, 23,  // top
]);

/**
 * @type {GeometryData}
 */
const CUBE_DATA = {
	vertex,
	index,
};

export {CUBE_DATA};
