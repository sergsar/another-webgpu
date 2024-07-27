class IndexedVertexBuffer {
	/**
	 * @param {Object} params
	 * @param {GPUDevice} params.device
	 * @param {Geometry} params.geometry
	 */
	constructor({device, geometry}) {
		const {vertex, index} = geometry;
		// TODO: these buffers are probably need to be mapped at creation
		// https://toji.dev/webgpu-best-practices/buffer-uploads
		this.vertexBuffer = device.createBuffer({
			label: `mesh-vertex-buffer:${geometry.id}`,
			size: vertex.byteLength,
			usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
		});
		this.indexBuffer = device.createBuffer({
			label: `mesh-index-buffer:${geometry.id}`,
			size: index.byteLength,
			usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
		});
		device.queue.writeBuffer(this.vertexBuffer, 0, vertex);
		device.queue.writeBuffer(this.indexBuffer, 0, index);
	}
}

/** @internal **/
export {IndexedVertexBuffer};
