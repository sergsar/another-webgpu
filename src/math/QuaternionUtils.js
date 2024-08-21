/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * @typedef {'xyz'|'xzy'|'yxz'|'yzx'|'zxy'|'zyx'} RotationOrder
 */

class QuaternionUtils {
	/**
	 *
	 * @param {Float32Array} q
	 * @param {number} angleInRadians
	 * @param {Float32Array} dst
	 */
	static rotateX(q, angleInRadians, dst = new Float32Array(4)) {
		const halfAngle = angleInRadians * 0.5;
		const qx = q[0];
		const qy = q[1];
		const qz = q[2];
		const qw = q[3];
		const bx = Math.sin(halfAngle);
		const bw = Math.cos(halfAngle);
		dst[0] = qx * bw + qw * bx;
		dst[1] = qy * bw + qz * bx;
		dst[2] = qz * bw - qy * bx;
		dst[3] = qw * bw - qx * bx;
		return dst;
	}

	/**
	 * @param {Float32Array} q
	 * @param {number} angleInRadians
	 * @param {Float32Array} dst
	 */
	static rotateY(q, angleInRadians, dst = new Float32Array(4)) {
		const halfAngle = angleInRadians * 0.5;
		const qx = q[0];
		const qy = q[1];
		const qz = q[2];
		const qw = q[3];
		const by = Math.sin(halfAngle);
		const bw = Math.cos(halfAngle);
		dst[0] = qx * bw - qz * by;
		dst[1] = qy * bw + qw * by;
		dst[2] = qz * bw + qx * by;
		dst[3] = qw * bw - qy * by;
		return dst;
	}

	/**
	 * @param {Float32Array} q
	 * @param {number} angleInRadians
	 * @param {Float32Array} dst
	 */
	static rotateZ(q, angleInRadians, dst = new Float32Array(4)) {
		const halfAngle = angleInRadians * 0.5;
		const qx = q[0];
		const qy = q[1];
		const qz = q[2];
		const qw = q[3];
		const bz = Math.sin(halfAngle);
		const bw = Math.cos(halfAngle);
		dst[0] = qx * bw + qy * bz;
		dst[1] = qy * bw - qx * bz;
		dst[2] = qz * bw + qw * bz;
		dst[3] = qw * bw - qz * bz;
		return dst;
	}

	/**
	 * @param {number} xRadians
	 * @param {number} yRadians
	 * @param {number} zRadians
	 * @param {RotationOrder} order
	 * @param {Float32Array} dst
	 */
	static fromEuler(
		xRadians,
		yRadians,
		zRadians,
		order = 'xyz',
		dst = new Float32Array(4),
	) {
		const xHalfAngle = xRadians * 0.5;
		const yHalfAngle = yRadians * 0.5;
		const zHalfAngle = zRadians * 0.5;
		const sx = Math.sin(xHalfAngle);
		const cx = Math.cos(xHalfAngle);
		const sy = Math.sin(yHalfAngle);
		const cy = Math.cos(yHalfAngle);
		const sz = Math.sin(zHalfAngle);
		const cz = Math.cos(zHalfAngle);
		switch (order) {
			case 'xyz':
				dst[0] = sx * cy * cz + cx * sy * sz;
				dst[1] = cx * sy * cz - sx * cy * sz;
				dst[2] = cx * cy * sz + sx * sy * cz;
				dst[3] = cx * cy * cz - sx * sy * sz;
				break;
			case 'xzy':
				dst[0] = sx * cy * cz - cx * sy * sz;
				dst[1] = cx * sy * cz - sx * cy * sz;
				dst[2] = cx * cy * sz + sx * sy * cz;
				dst[3] = cx * cy * cz + sx * sy * sz;
				break;
			case 'yxz':
				dst[0] = sx * cy * cz + cx * sy * sz;
				dst[1] = cx * sy * cz - sx * cy * sz;
				dst[2] = cx * cy * sz - sx * sy * cz;
				dst[3] = cx * cy * cz + sx * sy * sz;
				break;
			case 'yzx':
				dst[0] = sx * cy * cz + cx * sy * sz;
				dst[1] = cx * sy * cz + sx * cy * sz;
				dst[2] = cx * cy * sz - sx * sy * cz;
				dst[3] = cx * cy * cz - sx * sy * sz;
				break;
			case 'zxy':
				dst[0] = sx * cy * cz - cx * sy * sz;
				dst[1] = cx * sy * cz + sx * cy * sz;
				dst[2] = cx * cy * sz + sx * sy * cz;
				dst[3] = cx * cy * cz - sx * sy * sz;
				break;
			case 'zyx':
				dst[0] = sx * cy * cz - cx * sy * sz;
				dst[1] = cx * sy * cz + sx * cy * sz;
				dst[2] = cx * cy * sz - sx * sy * cz;
				dst[3] = cx * cy * cz + sx * sy * sz;
				break;
			default:
				throw new Error(`Unknown rotation order: ${order}`);
		}
		return dst;
	}
}

export {QuaternionUtils};
