import {Vector3Utils} from './Vector3Utils.js';
import {Vector4Utils} from './Vector4Utils.js';

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
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} dst
	 */
	static multiply(a, b, dst = new Float32Array(4)) {
		const ax = a[0];
		const ay = a[1];
		const az = a[2];
		const aw = a[3];
		const bx = b[0];
		const by = b[1];
		const bz = b[2];
		const bw = b[3];
		dst[0] = ax * bw + aw * bx + ay * bz - az * by;
		dst[1] = ay * bw + aw * by + az * bx - ax * bz;
		dst[2] = az * bw + aw * bz + ax * by - ay * bx;
		dst[3] = aw * bw - ax * bx - ay * by - az * bz;
		return dst;
	}

	/**
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

	/**
	 * @param {Float32Array} from
	 * @param {Float32Array} to
	 * @param {Float32Array} dst
	 */
	static fromUnitVectors(from, to, dst = new Float32Array(4)) {
		// assumes direction vectors vFrom and vTo are normalized

		let r = Vector3Utils.dot(from, to) + 1;

		if (r < Number.EPSILON) {
			// vFrom and vTo point in opposite directions

			r = 0;

			if (Math.abs(from[0]) > Math.abs(from[2])) {
				dst[0] = -from[1];
				dst[1] = from[0];
				dst[2] = 0;
				dst[3] = r;
			} else {
				dst[0] = 0;
				dst[1] = -from[2];
				dst[2] = from[1];
				dst[4] = r;
			}
		} else {
			dst[0] = from[1] * to[2] - from[2] * to[1];
			dst[1] = from[2] * to[0] - from[0] * to[2];
			dst[2] = from[0] * to[1] - from[1] * to[0];
			dst[3] = r;
		}

		return Vector4Utils.normalize(dst, dst);
	}

	/**
	 * @param {Float32Array} q
	 * @param {Float32Array} dst
	 */
	static inverse(q, dst = new Float32Array(4)) {
		const a0 = q[0];
		const a1 = q[1];
		const a2 = q[2];
		const a3 = q[3];
		const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
		const invDot = dot ? 1 / dot : 0;
		dst[0] = -a0 * invDot;
		dst[1] = -a1 * invDot;
		dst[2] = -a2 * invDot;
		dst[3] = a3 * invDot;

		return dst;
	}

	/**
	 * @param {Float32Array} q
	 * @param {Float32Array} dst
	 */
	static conjugate(q, dst) {
		dst[0] = -q[0];
		dst[1] = -q[1];
		dst[2] = -q[2];
		dst[3] = q[3];

		return dst;
	}
}

export {QuaternionUtils};
