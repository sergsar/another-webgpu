import {Matrix4Utils} from '../math/Matrix4Utils.js';
import {Matrix3Utils} from '../math/Matrix3Utils.js';

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

		let world = Matrix4Utils.identity();

		this.getBindGroup = () => bindGroup;

		/**
		 * @param {Float32Array} worldMatrixData
		 */
		this.updateWorld = worldMatrixData => {
			world = worldMatrixData;
			Matrix3Utils.fromMat4(
				Matrix4Utils.transpose(Matrix4Utils.inverse(world)),
				normalMatrixData,
			);
		};

		/**
		 * @param {Float32Array} viewProjectionMatrixData
		 **/
		this.updateViewProjection = viewProjectionMatrixData => {
			Matrix4Utils.multiply(
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
