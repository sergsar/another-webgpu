import {Vector2Utils} from './Vector2Utils.js';

class Vector2 {
	constructor(x = 0, y = 0) {
		Object.defineProperties(this, {
			elements: {
				value: new Float32Array([x, y]),
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

	set(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	add(v = new Vector2(), dst = this) {
		Vector2Utils.add(this.elements, v.elements, dst.elements);
		return dst;
	}

	subtract(v = new Vector2(), dst = this) {
		Vector2Utils.subtract(this.elements, v.elements, dst.elements);
		return dst;
	}

	/**
	 * @param {Vector2} src
	 **/
	copy(src) {
		this.x = src.x;
		this.y = src.y;
		return this;
	}
}

export {Vector2};
