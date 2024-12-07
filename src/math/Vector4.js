import {Vector4Utils} from './Vector4Utils.js';
import {Matrix4} from './Matrix4.js';

class Vector4 {
	constructor(x = 0, y = 0, z = 0, w = 0) {
		Object.defineProperties(this, {
			elements: {
				value: new Float32Array([x, y, z, w]),
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

	get w() {
		return this.elements[3];
	}

	/** @param {number} value **/
	set w(value) {
		this.elements[3] = value;
	}

	set(x = 0, y = 0, z = 0, w = 0) {
		this.elements[0] = x;
		this.elements[1] = y;
		this.elements[2] = z;
		this.elements[3] = w;
		return this;
	}

	get length() {
		return Vector4Utils.length(this.elements);
	}

	/** @param {number} value **/
	set length(value) {
		Vector4Utils.setLength(this.elements, value, this.elements);
	}

	normalize() {
		Vector4Utils.normalize(this.elements, this.elements);
	}

	copy(v = new Vector4()) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = v.w;
		return this;
	}

	applyMatrix4(m = new Matrix4()) {
		Vector4Utils.applyMatrix4(this.elements, m.elements, this.elements);
		return this;
	}
}

export {Vector4};
