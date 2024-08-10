import {Vector3Utils} from './Vector3Utils.js';

class Vector3 {
	constructor(x = 0, y = 0, z = 0) {
		Object.defineProperties(this, {
			elements: {
				value: new Float32Array([x, y, z]),
			},
		});
	}

	normalize() {
		Vector3Utils.normalize(this.elements, this.elements);
	}

	get x() {
		return this.elements[0];
	}

	/** @param {number} value **/
	set x(value) {
		this.elements[0] = value;
	}
	get y() {
		return this.elements[1];
	}

	/** @param {number} value **/
	set y(value) {
		this.elements[1] = value;
	}
	get z() {
		return this.elements[2];
	}

	/** @param {number} value **/
	set z(value) {
		this.elements[2] = value;
	}

	set(x = 0, y = 0, z = 0) {
		this.elements[0] = x;
		this.elements[1] = y;
		this.elements[2] = z;
	}
}

export {Vector3};
