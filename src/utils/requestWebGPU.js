/**
 * @typedef RequestGPUParams
 * @property {GPURequestAdapterOptions} [adapterOptions]
 */


/**
 * @async
 * @param {RequestGPUParams} [params]
 * @returns {Promise<{device: GPUDevice}>}
 */
async function requestWebGPU(params = {}) {
	const {adapterOptions} = params;
	if (!navigator.gpu) {
		throw new Error('WebGPU not supported on this browser.');
	}
	const adapter = await navigator.gpu.requestAdapter(adapterOptions);
	if (!adapter) {
		throw new Error('No appropriate GPUAdapter found.');
	}
	const device = await adapter.requestDevice();
	if (!device) {
		throw Error(`Couldn't request WebGPU logical device.`);
	}
	return {device};
}

export {requestWebGPU};
