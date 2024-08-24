import {CUBE_DATA} from '../consts/cube-data.js';
import {Geometry} from './Geometry.js';

/**
 * @extends Geometry
 */
class BoxGeometry extends Geometry {
	constructor() {
		super();
		this.geometryData = CUBE_DATA;
	}
}

export {BoxGeometry};
