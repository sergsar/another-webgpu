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
 * @typedef {'xyz'|'zyx'} RotationOrder
 */

class QuaternionUtils {
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
