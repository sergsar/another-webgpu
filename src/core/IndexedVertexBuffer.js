class IndexedVertexBuffer {
	/**
	 * @param {Object} params
	 * @param {GPUDevice} params.device
	 * @param {Geometry} params.geometry
	 */
	constructor({device, geometry}) {
		const {vertexData, indexData} = geometry.geometryData;
		// TODO: these buffers are probably need to be mapped at creation
		// https://toji.dev/webgpu-best-practices/buffer-uploads
		this.vertexBuffer = device.createBuffer({
			label: `mesh-vertex-buffer:${geometry.id}`,
			size: vertexData.byteLength,
			usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
		});
		this.indexBuffer = device.createBuffer({
			label: `mesh-index-buffer:${geometry.id}`,
			size: indexData.byteLength,
			usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
		});
		device.queue.writeBuffer(this.vertexBuffer, 0, vertexData);
		device.queue.writeBuffer(this.indexBuffer, 0, indexData);
	}
}

/** @internal **/
export {IndexedVertexBuffer};
