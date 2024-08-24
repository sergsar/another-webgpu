import {Vector3} from '../math/Vector3.js';

/**
 * @property {number} fieldOfView
 * @property {number} aspect
 * @property {number} zNear
 * @property {number} zFar
 * @property {Vector3} position
 */
class Camera {
	/**
	 * @param {Object} [params]
	 * @param {number} [params.fieldOfView]
	 * @param {number} [params.aspect]
	 * @param {number} [params.zNear]
	 * @param {number} [params.zFar]
	 */
	constructor({fieldOfView = 60, aspect = 1, zNear = 1, zFar = 2000} = {}) {
		this.fieldOfView = fieldOfView;
		this.aspect = aspect;
		this.zNear = zNear;
		this.zFar = zFar;
		this.position = new Vector3();
		this.target = new Vector3();
	}
}

export {Camera};
