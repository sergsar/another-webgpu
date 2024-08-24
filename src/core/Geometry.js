import {generateUUID} from '../utils/generateUUID.js';

/**
 * @typedef GeometryData
 * @property {Float32Array} vertex
 * @property {Uint16Array} index
 */

/**
 * @property {string} id
 * @property {Float32Array} vertex
 * @property {Uint16Array} index
 */
class Geometry {
	/**
	 * @param {GeometryData} data
	 */
	constructor(data) {
		this.id = generateUUID();
		this.vertex = data.vertex;
		this.index = data.index;
	}
}

export {Geometry};
