/*
 * Partly has Gregg Tavares code - Copyright 2022 Gregg Tavares
 */

class Vector4Utils {
	/**
	 * @param {Float32Array} v
	 * @param {Float32Array} [dst]
	 */
	static normalize(v, dst = new Float32Array(4)) {
		const length = Math.sqrt(
			v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3],
		);
		// make sure we don't divide by 0.
		if (length > 0.00001) {
			dst[0] = v[0] / length;
			dst[1] = v[1] / length;
			dst[2] = v[2] / length;
			dst[3] = v[3] / length;
		} else {
			dst[0] = 0;
			dst[1] = 0;
			dst[2] = 0;
			dst[3] = 0;
		}

		return dst;
	}

	static length(v = new Float32Array(4)) {
		const v0 = v[0];
		const v1 = v[1];
		const v2 = v[2];
		const v3 = v[3];
		return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2 + v3 * v3);
	}

	static setLength(v = new Float32Array(4), l = 1, dst = new Float32Array(4)) {
		this.normalize(v, dst);
		this.multiplyScalar(dst, l, dst);
	}

	static multiplyScalar(
		v = new Float32Array(4),
		k = 1,
		dst = new Float32Array(4),
	) {
		dst[0] = v[0] * k;
		dst[1] = v[1] * k;
		dst[2] = v[2] * k;
		dst[3] = v[3] * k;
		return dst;
	}

	static applyMatrix4(
		v = new Float32Array(4),
		m = new Float32Array(16),
		dst = new Float32Array(4),
	) {
		const x = v[0];
		const y = v[1];
		const z = v[2];
		const w = v[3];
		dst[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
		dst[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
		dst[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
		dst[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
		return dst;
	}
}

export {Vector4Utils};
