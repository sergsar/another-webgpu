import {Geometry} from './Geometry.js';
import {TETRAHEDRON_DATA} from '../consts/tetrahedron-data.js';

/**
 * @extends Geometry
 */
class TetrahedronGeometry extends Geometry {
	constructor() {
		super();
		this.geometryData = TETRAHEDRON_DATA;
	}
}

export {TetrahedronGeometry};
