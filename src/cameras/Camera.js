import {Vector3} from '../math/Vector3.js';
import {Object3D} from '../core/Object3D.js';
import {Matrix4} from '../math/Matrix4.js';
import {Matrix4Utils} from '../math/Matrix4Utils.js';
import {UnitUtils} from '../utils/UnitUtils.js';

class Camera extends Object3D {
	/**
	 * @param {Object} [params]
	 * @param {number} [params.fieldOfView]
	 * @param {number} [params.aspect]
	 * @param {number} [params.zNear]
	 * @param {number} [params.zFar]
	 */
	constructor({fieldOfView = 60, aspect = 1, zNear = 1, zFar = 2000} = {}) {
		super();
		this.fieldOfView = fieldOfView;
		this.aspect = aspect;
		this.zNear = zNear;
		this.zFar = zFar;
		this.target = new Vector3();
		this.up = new Vector3(0, 1, 0);
		this.projectionMatrix = new Matrix4();
		this.viewMatrix = new Matrix4();
		this.viewProjectionMatrix = new Matrix4();
		this.depthBuffer = new Float32Array();
		this.useDepth = false;
	}

	updateMatrix() {
		Matrix4Utils.cameraAim(
			this.position.elements,
			this.target.elements,
			this.up.elements,
			this.matrix.elements,
		);
		Matrix4Utils.inverse(this.matrix.elements, this.viewMatrix.elements);
	}

	updateProjectionMatrix() {
		Matrix4Utils.perspective(
			UnitUtils.degToRad(this.fieldOfView),
			this.aspect,
			this.zNear,
			this.zFar,
			this.projectionMatrix.elements,
		);
	}

	// Combine the view and projection matrices
	updateViewProjectionMatrix() {
		Matrix4Utils.multiply(
			this.projectionMatrix.elements,
			this.viewMatrix.elements,
			this.viewProjectionMatrix.elements,
		);
	}
}

export {Camera};
