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

	rotateX(radians = 0) {
		QuaternionUtils.rotateX(this.elements, radians, this.elements);
	}

	rotateY(radians = 0) {
		QuaternionUtils.rotateY(this.elements, radians, this.elements);
	}

	rotateZ(radians = 0) {
		QuaternionUtils.rotateZ(this.elements, radians, this.elements);
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
	}
}

export {Quaternion};
