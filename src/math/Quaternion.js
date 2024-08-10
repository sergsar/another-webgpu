import {QuaternionUtils} from './QuaternionUtils.js';
import {degToRad} from '../utils/degToRad.js';

class Quaternion {
	/**
	 * @param {number} args
	 * **/
	constructor(...args) {
		const [x = 0, y = 0, z = 0, w = 1] = args;
		Object.defineProperties(this, {
			elements: {
				value: new Float32Array([x, y, z, w]),
			},
		});
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
			degToRad(x),
			degToRad(y),
			degToRad(z),
			order,
			this.elements,
		);
	}
}

export {Quaternion};
