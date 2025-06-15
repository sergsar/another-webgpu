import {QuaternionUtils} from './QuaternionUtils.js';
import {UnitUtils} from '../utils/UnitUtils.js';

class Quaternion {
	/**
	 * @param {number[]} args
	 * **/
	constructor(...args) {
		const [x = 0, y = 0, z = 0, w = 1] = args;
		Object.defineProperties(this, {
			elements: {
				value: new Float32Array([x, y, z, w]),
			},
		});
	}

	set(x = 0, y = 0, z = 0, w = 1) {
		this.elements.set([x, y, z, w]);
	}

	multiply(q = new Quaternion()) {
		QuaternionUtils.multiply(this.elements, q.elements, this.elements);
		return this;
	}

	premultiply(q = new Quaternion()) {
		QuaternionUtils.multiply(q.elements, this.elements, this.elements);
		return this;
	}

	inverse() {
		QuaternionUtils.inverse(this.elements, this.elements);
		return this;
	}

	conjugate() {
		QuaternionUtils.conjugate(this.elements, this.elements);
		return this;
	}

	copy({elements: [x, y, z, w]} = new Quaternion()) {
		this.elements.set([x, y, z, w]);
		return this;
	}

	rotateX(radians = 0) {
		QuaternionUtils.rotateX(this.elements, radians, this.elements);
		return this;
	}

	rotateY(radians = 0) {
		QuaternionUtils.rotateY(this.elements, radians, this.elements);
		return this;
	}

	rotateZ(radians = 0) {
		QuaternionUtils.rotateZ(this.elements, radians, this.elements);
		return this;
	}

	/**
	 *
	 * @param x
	 * @param y
	 * @param z
	 * @param {RotationOrder} order
	 */
	setFromEuler(x = 0, y = 0, z = 0, order = 'xyz') {
		QuaternionUtils.fromEuler(
			UnitUtils.degToRad(x),
			UnitUtils.degToRad(y),
			UnitUtils.degToRad(z),
			order,
			this.elements,
		);
		return this;
	}

	/**
	 *
	 * @param {Vector3} from
	 * @param {Vector3} to
	 */
	setFromUnitVectors(from, to) {
		QuaternionUtils.fromUnitVectors(from.elements, to.elements, this.elements);
		return this;
	}
}

export {Quaternion};
