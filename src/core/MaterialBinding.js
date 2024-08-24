class MaterialBinding {
	/**
	 * @param {Object} params
	 * @param {GPUDevice} params.device
	 * @param {GPUBindGroupLayout} params.bindGroupLayout
	 */
	constructor({device, bindGroupLayout}) {
		const bufferSize = (4 + 32) * 4;

		const buffer = device.createBuffer({
			label: 'material uniforms',
			size: bufferSize,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		});

		const uniformsData = new Float32Array(bufferSize / 4);

		const kColorOffset = 0;
		const colorData = uniformsData.subarray(kColorOffset, kColorOffset + 4);

		const bindGroup = device.createBindGroup({
			label: 'material bind group',
			layout: bindGroupLayout,
			entries: [{binding: 0, resource: {buffer}}],
		});

		this.getBindGroup = () => bindGroup;

		/**
		 *
		 * @param {number} r
		 * @param {number} g
		 * @param {number} b
		 * @param {number} a
		 */
		this.setColor = (r, g, b, a) => {
			colorData.set([r, g, b, a]);
		};

		this.writeBufferToQueue = () => {
			device.queue.writeBuffer(buffer, 0, uniformsData);
		};
	}
}

export {MaterialBinding};
