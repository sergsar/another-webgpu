import {Vector3Utils} from './Vector3Utils.js';
import {Quaternion} from './Quaternion.js';

class Vector3 {
	constructor(x = 0, y = 0, z = 0) {
		Object.defineProperties(this, {
			elements: {
				value: new Float32Array([x, y, z]),
			},
		});
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

	get length() {
		return Vector3Utils.length(this.elements);
	}

	/** @param {number} value **/
	set length(value) {
		Vector3Utils.setLength(this.elements, value, this.elements);
	}

	normalize() {
		Vector3Utils.normalize(this.elements, this.elements);
	}

	subtract(v = new Vector3(), dst = this) {
		Vector3Utils.subtract(this.elements, v.elements, dst.elements);
		return dst;
	}

	add(v = new Vector3(), dst = this) {
		Vector3Utils.add(this.elements, v.elements, dst.elements);
		return dst;
	}

	copy(v = new Vector3()) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}

	applyQuaternion(q = new Quaternion()) {
		Vector3Utils.applyQuaternion(this.elements, q.elements, this.elements);
		return this;
	}
}

export {Vector3};
