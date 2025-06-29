import {Vector3Utils} from './Vector3Utils.js';
import {Quaternion} from './Quaternion.js';
import {Matrix4} from './Matrix4.js';

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
		return this;
	}

	setX(value) {
		this.elements[0] = value;
		return this;
	}

	setY(value) {
		this.elements[1] = value;
		return this;
	}

	setZ(value) {
		this.elements[2] = value;
		return this;
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
		return this;
	}

	subtract(v = new Vector3(), dst = this) {
		Vector3Utils.subtract(this.elements, v.elements, dst.elements);
		return dst;
	}

	add(v = new Vector3(), dst = this) {
		Vector3Utils.add(this.elements, v.elements, dst.elements);
		return dst;
	}

	multiplyScalar(k = 1, dst = this) {
		Vector3Utils.multiplyScalar(this.elements, k, dst.elements);
		return dst;
	}

	dot(v = new Vector3()) {
		return Vector3Utils.dot(this.elements, v.elements);
	}

	cross(v = new Vector3()) {
		Vector3Utils.cross(this.elements, v.elements, this.elements);
		return this;
	}

	copy(v = new Vector3()) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}

	applyMatrix4(m = new Matrix4()) {
		Vector3Utils.applyMatrix4(this.elements, m.elements, this.elements);
		return this;
	}

	applyQuaternion(q = new Quaternion()) {
		Vector3Utils.applyQuaternion(this.elements, q.elements, this.elements);
		return this;
	}
}

export {Vector3};
