/*
 * Partly has Gregg Tavares code - Copyright 2022 Gregg Tavares
 */

class Vector2Utils {
	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} [dst]
	 */
	static add(a, b, dst = new Float32Array(2)) {
		dst[0] = a[0] + b[0];
		dst[1] = a[1] + b[1];

		return dst;
	}

	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} [dst]
	 */
	static subtract(a, b, dst = new Float32Array(2)) {
		dst[0] = a[0] - b[0];
		dst[1] = a[1] - b[1];

		return dst;
	}
}

export {Vector2Utils};
