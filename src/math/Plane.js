import {Vector3} from './Vector3.js';

class Plane {
	constructor(normal = new Vector3(0, 1, 0), distance = 0) {
		this.normal = normal;
		this.distance = distance;
	}

	distanceToPoint(point = new Vector3()) {
		return this.normal.dot(point) + this.distance;
	}
}

export {Plane};
