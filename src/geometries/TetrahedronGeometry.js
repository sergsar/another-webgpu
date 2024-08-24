import {Geometry} from '../core/Geometry.js';
import {TETRAHEDRON_DATA} from '../consts/tetrahedron-data.js';

/**
 * @extends Geometry
 */
class TetrahedronGeometry extends Geometry {
	constructor() {
		super(TETRAHEDRON_DATA);
	}
}

export {TetrahedronGeometry};
