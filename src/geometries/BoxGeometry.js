import {CUBE_DATA} from '../consts/cube-data.js';
import {Geometry} from '../core/Geometry.js';

/**
 * @extends Geometry
 */
class BoxGeometry extends Geometry {
	constructor() {
		super(CUBE_DATA);
	}
}

export {BoxGeometry};
