import {matrix4} from '../math/Matrix4.js';
import {degToRad} from '../utils/degToRad.js';
import {matrix3} from '../math/Matrix3.js';

class ModelBinding {
	/**
	 * @param {Object} params
	 * @param {GPUDevice} params.device
	 * @param {GPUBindGroupLayout} params.bindGroupLayout
	 */
	constructor({device, bindGroupLayout}) {
		const bufferSize = (12 + 16 + 8) * 4;
		const buffer = device.createBuffer({
			label: 'transform-uniforms',
			size: bufferSize,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		});

		const uniformsData = new Float32Array(bufferSize / 4);
		const normalMatrixOffset = 0;
		const worldViewProjectionMatrixOffset = 12;

		const normalMatrixData = uniformsData.subarray(
			normalMatrixOffset,
			normalMatrixOffset + 12,
		);
		const worldViewProjectionMatrixData = uniformsData.subarray(
			worldViewProjectionMatrixOffset,
			worldViewProjectionMatrixOffset + 16,
		);

		const bindGroup = device.createBindGroup({
			label: 'transform bind group',
			layout: bindGroupLayout,
			entries: [{binding: 0, resource: {buffer: buffer}}],
		});

		const world = matrix4.identity();

		this.getBindGroup = () => bindGroup;

		/**
		 * @param {Vector3} [params.position]
		 * @param {number} [params.rotation]
		 * @param {Vector3} [params.scale]
		 */
		this.updateWorld = ({position, rotation, scale}) => {
			matrix4.identity(world);
			if (position) {
				matrix4.translate(world, [position.x, position.y, position.z], world);
			}
			if (rotation) {
				matrix4.rotateY(world, degToRad(rotation), world);
			}
			if (scale) {
				matrix4.scale(world, [scale.x, scale.y, scale.z], world);
			}
			matrix3.fromMat4(
				matrix4.transpose(matrix4.inverse(world)),
				normalMatrixData,
			);
		};

		/**
		 * @param {Float32Array} viewProjectionMatrixData
		 **/
		this.updateViewProjection = viewProjectionMatrixData => {
			matrix4.multiply(
				viewProjectionMatrixData,
				world,
				worldViewProjectionMatrixData,
			);
		};

		this.writeBufferToQueue = () => {
			device.queue.writeBuffer(buffer, 0, uniformsData);
		};
	}
}

export {ModelBinding};
