import {generateUUID} from '../utils/generateUUID.js';
import {Vector3} from '../math/Vector3.js';
import {Material} from '../materials/Material.js';

/**
 * @property {string} id
 * @property {BoxGeometry} geometry
 */
class Mesh {
	/**
	 * @param {Object} params
	 * @param {Geometry} params.geometry
	 * @param {Material} [params.material]
	 */
	constructor({geometry, material = new Material()}) {
		this.id = generateUUID();
		this.geometry = geometry;
		this.material = material;
		this.position = new Vector3(0, 0, 0);
		this.rotation = 0;
		this.scale = new Vector3(1, 1, 1);
		this.needsUpdate = true;
	}
}

export {Mesh};
