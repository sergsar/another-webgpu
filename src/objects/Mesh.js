import {Material} from '../materials/Material.js';
import {Object3D} from '../core/Object3D.js';

class Mesh extends Object3D {
	/**
	 * @param {Object} params
	 * @param {Geometry} params.geometry
	 * @param {Material} [params.material]
	 */
	constructor({geometry, material = new Material()}) {
		super();
		this.geometry = geometry;
		this.material = material;
	}
}

export {Mesh};
