import {Vector3} from './Vector3.js';
import {Plane} from './Plane.js';

class Ray {
	constructor(origin = new Vector3(), direction = new Vector3(0, 1, 0)) {
		this.origin = origin;
		this.direction = direction;
		this.length = length;
	}

	distanceToPlane(plane = new Plane()) {
		const denominator = plane.normal.dot(this.direction);
		if (denominator === 0) {
			// line is coplanar, return origin
			if (plane.distanceToPoint(this.origin) === 0) {
				return 0;
			}
			return null;
		}

		const distance =
			(plane.distance - this.origin.dot(plane.normal)) / denominator;

		// Null if the ray never intersects the plane
		return distance >= 0 ? distance : null;
	}

	intersectPlane(plane = new Plane(), dst = new Vector3()) {
		const distance = this.distanceToPlane(plane);
		if (distance === null) {
			return null;
		}

		return this.direction.multiplyScalar(distance, dst).add(this.origin);
	}
}

export {Ray};
