import {matrix4} from '../math/Matrix4.js';
import {degToRad} from '../utils/degToRad.js';
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
					format: 'depth24plus',
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
					if (depthTexture) {
						depthTexture.destroy();
					}
					depthTexture = device.createTexture({
						size: [canvasTexture.width, canvasTexture.height],
						format: 'depth24plus',
						usage: GPUTextureUsage.RENDER_ATTACHMENT,
					});
				}
				renderPassDescriptor.depthStencilAttachment.view =
					depthTexture.createView();

				const commandEncoder = device.createCommandEncoder();
				const passEncoder =
					commandEncoder.beginRenderPass(renderPassDescriptor);
				passEncoder.setPipeline(pipeline);

				const aspect = canvas.clientWidth / canvas.clientHeight;
				const projection = matrix4.perspective(
					degToRad(camera.fieldOfView),
					aspect,
					camera.zNear,
					camera.zFar,
				);
				const eye = [camera.position.x, camera.position.y, camera.position.z];
				const target = [camera.target.x, camera.target.y, camera.target.z];
				const up = [0, 1, 0];

				// Compute a view matrix
				const viewMatrixData = matrix4.lookAt(eye, target, up);

				// Combine the view and projection matrixes
				const viewProjectionMatrixData = matrix4.multiply(
					projection,
					viewMatrixData,
				);

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
						modelBinding.updateWorld({
							position: mesh.position,
							rotation: mesh.rotation,
							scale: mesh.scale,
						});
					}

					modelBinding.updateViewProjection(viewProjectionMatrixData);
					modelBinding.writeBufferToQueue();

					passEncoder.setBindGroup(2, modelBinding.getBindGroup());

					passEncoder.setVertexBuffer(0, vertexBuffer);
					passEncoder.setIndexBuffer(indexBuffer, 'uint16');
					passEncoder.drawIndexed(numVertices);
				});

				passEncoder.end();

				const commandBuffer = commandEncoder.finish();
				device.queue.submit([commandBuffer]);
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
