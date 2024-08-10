import {generateUUID} from '../utils/generateUUID.js';
import {Vector3} from '../math/Vector3.js';
import {Matrix4Utils} from '../math/Matrix4Utils.js';
import {Quaternion} from '../math/Quaternion.js';

class Object3D {
	constructor() {
		this.id = generateUUID();

		Object.defineProperties(this, {
			matrix: {value: Matrix4Utils.identity()},
		});
		this.position = new Vector3();
		this.scale = new Vector3(1, 1, 1);
		this.quaternion = new Quaternion();
		this.needsUpdate = true;
	}

	updateMatrix() {
		Matrix4Utils.identity(this.matrix);
		Matrix4Utils.translate(this.matrix, this.position.elements);
		Matrix4Utils.rotate(
			this.matrix,
			Matrix4Utils.fromQuaternion(this.quaternion.elements),
		);
		Matrix4Utils.scale(this.matrix, this.scale.elements);
	}
}

export {Object3D};
