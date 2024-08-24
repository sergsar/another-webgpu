class RendererBinding {
	/**
	 * @param {Object} params
	 * @param {GPUDevice} params.device
	 * @param {GPUBindGroupLayout} params.bindGroupLayout
	 */
	constructor({device, bindGroupLayout}) {
		const bufferSize = (4 + 32) * 4;

		const buffer = device.createBuffer({
			label: 'renderer uniforms',
			size: bufferSize,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		});

		const uniformsData = new Float32Array(bufferSize / 4);

		const kLightDirectionOffset = 0;

		const lightDirectionData = uniformsData.subarray(
			kLightDirectionOffset,
			kLightDirectionOffset + 3,
		);

		const bindGroup = device.createBindGroup({
			label: 'renderer bind group',
			layout: bindGroupLayout,
			entries: [{binding: 0, resource: {buffer}}],
		});

		this.getBindGroup = () => bindGroup;

		/**
		 * @param {Vector3} direction
		 */
		this.setLightDirection = direction => {
			lightDirectionData.set([direction.x, direction.y, direction.z]);
		};

		this.writeBufferToQueue = () => {
			device.queue.writeBuffer(buffer, 0, uniformsData);
		};
	}
}

export {RendererBinding};
