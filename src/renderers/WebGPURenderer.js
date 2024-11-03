import {basicShader} from './shaders/ShaderLib/basic.wgsl.js';
import {ModelBinding} from '../core/ModelBinding.js';
import {IndexedVertexBuffer} from '../core/IndexedVertexBuffer.js';
import {RendererBinding} from '../core/RendererBinding.js';
import {MaterialBinding} from '../core/MaterialBinding.js';
import {requestWebGPU} from '../utils/requestWebGPU.js';

class WebGPURenderer {
	/**
	 * @async
	 * @param {HTMLCanvasElement} canvas
	 * @param {RequestGPUParams} [params]
	 * @returns {Promise<WebGPURenderer>}
	 */
	constructor(canvas, params) {
		const init = async () => {
			/** @type {{[key: string]: ModelBinding}} **/
			const modelBindings = {};

			/** @type {{[key: string]: MaterialBinding}} **/
			const materialBindings = {};

			/** @type {{[key: string]: IndexedVertexBuffer}} **/
			const vertexBuffers = {};

			/** @type {GPUTexture | null}} **/
			let depthTexture = null;

			/** @type {GPUBuffer | null} **/
			let depthBuffer = null;

			let {/** @type {GPUDevice | null} **/ device} =
				await requestWebGPU(params);

			console.log('WebGPU device initialized');

			const context = canvas.getContext('webgpu');

			device.lost.then(async info => {
				device = null;
				Object.assign(vertexBuffers, {});
				Object.assign(modelBindings, {});
				Object.assign(materialBindings, {});
				if (info.reason === 'destroyed') {
					return;
				}
				console.warn(`WebGPU device was lost: ${info.message}`);
				await init();
			});

			const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
			context.unconfigure();
			context.configure({
				device,
				format: presentationFormat,
				alphaMode: 'premultiplied',
			});

			const module = device.createShaderModule({
				code: basicShader,
			});

			const rendererBindGroupLayout = device.createBindGroupLayout({
				entries: [
					{
						binding: 0,
						visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
						buffer: {},
					},
				],
			});
			const materialBindGroupLayout = device.createBindGroupLayout({
				entries: [
					{
						binding: 0,
						visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
						buffer: {},
					},
				],
			});
			const modelBindGroupLayout = device.createBindGroupLayout({
				entries: [
					{
						binding: 0,
						visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
						buffer: {},
					},
				],
			});

			const pipelineLayout = device.createPipelineLayout({
				bindGroupLayouts: [
					rendererBindGroupLayout,
					materialBindGroupLayout,
					modelBindGroupLayout,
				],
			});

			const pipeline = device.createRenderPipeline({
				label: 'rendering pipeline',
				layout: pipelineLayout,
				vertex: {
					module,
					buffers: [
						{
							arrayStride: (3 + 3) * 4, // (3+3) floats 4 bytes each
							attributes: [
								{shaderLocation: 0, offset: 0, format: 'float32x3'}, // position
								{shaderLocation: 1, offset: 12, format: 'float32x3'}, // normal
							],
						},
					],
				},
				fragment: {
					module,
					targets: [{format: presentationFormat}],
				},
				primitive: {
					cullMode: 'back',
				},
				depthStencil: {
					depthWriteEnabled: true,
					depthCompare: 'less',
					format: 'depth32float',
				},
			});

			const rendererBinding = new RendererBinding({
				device,
				bindGroupLayout: rendererBindGroupLayout,
			});

			const renderPassDescriptor = {
				label: 'main render pass',
				colorAttachments: [
					{
						// view: <- to be filled out when we render
						loadOp: 'clear',
						storeOp: 'store',
					},
				],
				depthStencilAttachment: {
					// view: <- to be filled out when we render
					depthClearValue: 1.0,
					depthLoadOp: 'clear',
					depthStoreOp: 'store',
				},
			};

			/**
			 * @param {Mesh[]} meshes
			 * @param {Camera} camera
			 * @param {DirectionalLight} light
			 **/
			this.render = (meshes, camera, light) => {
				if (!device) {
					return;
				}

				// Get the current texture from the canvas context and
				// set it as the texture to render to.
				const canvasTexture = context.getCurrentTexture();
				renderPassDescriptor.colorAttachments[0].view =
					canvasTexture.createView();

				// If we don't have a depth texture OR if its size is different
				// from the canvasTexture when make a new depth texture
				if (
					!depthTexture ||
					depthTexture.width !== canvasTexture.width ||
					depthTexture.height !== canvasTexture.height
				) {
					if (depthTexture) depthTexture.destroy();
					if (depthBuffer) depthBuffer.destroy();

					depthTexture = device.createTexture({
						size: [canvasTexture.width, canvasTexture.height],
						format: 'depth32float',
						usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
					});
					depthBuffer = device.createBuffer({
						size: canvasTexture.width * canvasTexture.height * 4,
						usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
					});
				}
				renderPassDescriptor.depthStencilAttachment.view =
					depthTexture.createView();

				const commandEncoder = device.createCommandEncoder();
				const passEncoder =
					commandEncoder.beginRenderPass(renderPassDescriptor);
				passEncoder.setPipeline(pipeline);

				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();
				camera.updateMatrix();
				camera.updateViewProjectionMatrix();

				rendererBinding.setLightDirection(light.direction);

				rendererBinding.writeBufferToQueue();
				passEncoder.setBindGroup(0, rendererBinding.getBindGroup());
				meshes.forEach(mesh => {
					const meshId = mesh.id;
					let modelBinding = modelBindings[meshId];
					if (!modelBinding) {
						mesh.needsUpdate = true;
						modelBindings[meshId] = new ModelBinding({
							device,
							bindGroupLayout: modelBindGroupLayout,
						});
						modelBinding = modelBindings[meshId];
					}

					const materialId = mesh.material.id;
					let materialBinding = materialBindings[materialId];
					if (!materialBinding) {
						mesh.material.needsUpdate = true;
						materialBindings[materialId] = new MaterialBinding({
							device,
							bindGroupLayout: materialBindGroupLayout,
						});
						materialBinding = materialBindings[materialId];
					}

					if (mesh.material.needsUpdate) {
						mesh.material.needsUpdate = false;
						materialBinding = materialBindings[materialId];
						materialBinding.setColor(...Object.values(mesh.material.color));
						materialBinding.writeBufferToQueue();
					}
					passEncoder.setBindGroup(1, materialBinding.getBindGroup());

					const geometryId = mesh.geometry.id;
					if (!vertexBuffers[geometryId]) {
						const geometry = mesh.geometry;
						vertexBuffers[geometryId] = new IndexedVertexBuffer({
							device,
							geometry,
						});
					}
					const numVertices = mesh.geometry.index.length;
					const vertexBuffer = vertexBuffers[geometryId].vertexBuffer;
					const indexBuffer = vertexBuffers[geometryId].indexBuffer;

					passEncoder.setVertexBuffer(0, vertexBuffer);

					if (mesh.needsUpdate) {
						mesh.needsUpdate = false;
						mesh.updateMatrix();
						modelBinding.updateWorld(mesh.matrix.elements);
					}

					modelBinding.updateViewProjection(
						camera.viewProjectionMatrix.elements,
					);
					modelBinding.writeBufferToQueue();

					passEncoder.setBindGroup(2, modelBinding.getBindGroup());

					passEncoder.setVertexBuffer(0, vertexBuffer);
					passEncoder.setIndexBuffer(indexBuffer, 'uint16');
					passEncoder.drawIndexed(numVertices);
				});

				passEncoder.end();

				if (depthBuffer.mapState !== 'pending') {
					commandEncoder.copyTextureToBuffer(
						{texture: depthTexture},
						{
							buffer: depthBuffer,
							offset: 0,
							bytesPerRow: canvasTexture.width * 4,
							rowsPerImage: canvasTexture.height,
						},
						[canvasTexture.width, canvasTexture.height, 1],
					);
				}

				device.queue.submit([commandEncoder.finish()]);

				if (depthBuffer.mapState !== 'pending') {
					depthBuffer.mapAsync(GPUMapMode.READ).then(() => {
						const arrayBuffer = depthBuffer.getMappedRange();
						const depthBufferData = new Float32Array(
							new Float32Array(arrayBuffer),
						);
						depthBuffer.unmap();
						camera.depthBuffer = depthBufferData;
					});
				}
			};

			this.destroy = () => {
				if (!device) {
					return;
				}
				console.log('Destroying WebGPU device');
				device.destroy();
				device = null;
			};

			return this;
		};
		return init();
	}
}

export {WebGPURenderer};
