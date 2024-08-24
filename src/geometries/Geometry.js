import {generateUUID} from '../utils/generateUUID.js';

/**
 * @typedef GeometryData
 * @property {Float32Array} vertexData
 * @property {Uint16Array} indexData
 * @property {number} numVertices
 */

/**
 * @property {string} id
 * @property {GeometryData} geometryData
 */
class Geometry {
	constructor() {
		this.id = generateUUID();
		this.geometryData = {
			vertexData: new Float32Array([]),
			indexData: new Uint16Array([]),
			numVertices: 0,
		};
	}
}

export {Geometry};
