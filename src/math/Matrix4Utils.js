//noinspection ALL

import {Vector3Utils} from './Vector3Utils.js';

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

class Matrix4Utils {
	/**
	 * @param {number} width
	 * @param {number} height
	 * @param {number} depth
	 * @param {Float32Array} [dst]
	 */
	static projection(width, height, depth, dst = new Float32Array(16)) {
		// Note: This matrix flips the Y axis so that 0 is at the top.
		return Matrix4Utils.ortho(0, width, height, 0, depth, -depth, dst);
	}

	/**
	 * @param {number} fieldOfViewYInRadians
	 * @param {number} aspect
	 * @param {number} zNear
	 * @param {number} zFar
	 * @param {Float32Array} [dst]
	 */
	static perspective(
		fieldOfViewYInRadians,
		aspect,
		zNear,
		zFar,
		dst = new Float32Array(16),
	) {
		const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
		const rangeInv = 1 / (zNear - zFar);

		dst[0] = f / aspect;
		dst[1] = 0;
		dst[2] = 0;
		dst[3] = 0;

		dst[4] = 0;
		dst[5] = f;
		dst[6] = 0;
		dst[7] = 0;

		dst[8] = 0;
		dst[9] = 0;
		dst[10] = zFar * rangeInv;
		dst[11] = -1;

		dst[12] = 0;
		dst[13] = 0;
		dst[14] = zNear * zFar * rangeInv;
		dst[15] = 0;

		return dst;
	}

	/**
	 * @param {number} left
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} top
	 * @param {number} near
	 * @param {number} far
	 * @param {Float32Array} [dst]
	 */
	static ortho(
		left,
		right,
		bottom,
		top,
		near,
		far,
		dst = new Float32Array(16),
	) {
		dst[0] = 2 / (right - left);
		dst[1] = 0;
		dst[2] = 0;
		dst[3] = 0;

		dst[4] = 0;
		dst[5] = 2 / (top - bottom);
		dst[6] = 0;
		dst[7] = 0;

		dst[8] = 0;
		dst[9] = 0;
		dst[10] = 1 / (near - far);
		dst[11] = 0;

		dst[12] = (right + left) / (left - right);
		dst[13] = (top + bottom) / (bottom - top);
		dst[14] = near / (near - far);
		dst[15] = 1;

		return dst;
	}

	// prettier-ignore
	static identity(dst = new Float32Array(16)) {
		dst[ 0] = 1;  dst[ 1] = 0;  dst[ 2] = 0;   dst[ 3] = 0;
		dst[ 4] = 0;  dst[ 5] = 1;  dst[ 6] = 0;   dst[ 7] = 0;
		dst[ 8] = 0;  dst[ 9] = 0;  dst[10] = 1;   dst[11] = 0;
		dst[12] = 0;  dst[13] = 0;  dst[14] = 0;   dst[15] = 1;
		return dst;
	}

	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} [dst]
	 */
	static multiply(a, b, dst = new Float32Array(16)) {
		// prettier-ignore
		const b00 = b[0 * 4 + 0];
		const b01 = b[0 * 4 + 1];
		const b02 = b[0 * 4 + 2];
		const b03 = b[0 * 4 + 3];
		const b10 = b[1 * 4 + 0];
		const b11 = b[1 * 4 + 1];
		const b12 = b[1 * 4 + 2];
		const b13 = b[1 * 4 + 3];
		const b20 = b[2 * 4 + 0];
		const b21 = b[2 * 4 + 1];
		const b22 = b[2 * 4 + 2];
		const b23 = b[2 * 4 + 3];
		const b30 = b[3 * 4 + 0];
		const b31 = b[3 * 4 + 1];
		const b32 = b[3 * 4 + 2];
		const b33 = b[3 * 4 + 3];
		const a00 = a[0 * 4 + 0];
		const a01 = a[0 * 4 + 1];
		const a02 = a[0 * 4 + 2];
		const a03 = a[0 * 4 + 3];
		const a10 = a[1 * 4 + 0];
		const a11 = a[1 * 4 + 1];
		const a12 = a[1 * 4 + 2];
		const a13 = a[1 * 4 + 3];
		const a20 = a[2 * 4 + 0];
		const a21 = a[2 * 4 + 1];
		const a22 = a[2 * 4 + 2];
		const a23 = a[2 * 4 + 3];
		const a30 = a[3 * 4 + 0];
		const a31 = a[3 * 4 + 1];
		const a32 = a[3 * 4 + 2];
		const a33 = a[3 * 4 + 3];

		dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
		dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
		dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
		dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;

		dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
		dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
		dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
		dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;

		dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
		dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
		dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
		dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;

		dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
		dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
		dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
		dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

		return dst;
	}

	/**
	 * @param {Float32Array} m
	 * @param {Float32Array} [dst]
	 */
	static inverse(m, dst = new Float32Array(16)) {
		// prettier-ignore
		const m00 = m[0 * 4 + 0];
		const m01 = m[0 * 4 + 1];
		const m02 = m[0 * 4 + 2];
		const m03 = m[0 * 4 + 3];
		const m10 = m[1 * 4 + 0];
		const m11 = m[1 * 4 + 1];
		const m12 = m[1 * 4 + 2];
		const m13 = m[1 * 4 + 3];
		const m20 = m[2 * 4 + 0];
		const m21 = m[2 * 4 + 1];
		const m22 = m[2 * 4 + 2];
		const m23 = m[2 * 4 + 3];
		const m30 = m[3 * 4 + 0];
		const m31 = m[3 * 4 + 1];
		const m32 = m[3 * 4 + 2];
		const m33 = m[3 * 4 + 3];

		const tmp0 = m22 * m33;
		const tmp1 = m32 * m23;
		const tmp2 = m12 * m33;
		const tmp3 = m32 * m13;
		const tmp4 = m12 * m23;
		const tmp5 = m22 * m13;
		const tmp6 = m02 * m33;
		const tmp7 = m32 * m03;
		const tmp8 = m02 * m23;
		const tmp9 = m22 * m03;
		const tmp10 = m02 * m13;
		const tmp11 = m12 * m03;
		const tmp12 = m20 * m31;
		const tmp13 = m30 * m21;
		const tmp14 = m10 * m31;
		const tmp15 = m30 * m11;
		const tmp16 = m10 * m21;
		const tmp17 = m20 * m11;
		const tmp18 = m00 * m31;
		const tmp19 = m30 * m01;
		const tmp20 = m00 * m21;
		const tmp21 = m20 * m01;
		const tmp22 = m00 * m11;
		const tmp23 = m10 * m01;

		const t0 =
			tmp0 * m11 +
			tmp3 * m21 +
			tmp4 * m31 -
			(tmp1 * m11 + tmp2 * m21 + tmp5 * m31);
		const t1 =
			tmp1 * m01 +
			tmp6 * m21 +
			tmp9 * m31 -
			(tmp0 * m01 + tmp7 * m21 + tmp8 * m31);
		const t2 =
			tmp2 * m01 +
			tmp7 * m11 +
			tmp10 * m31 -
			(tmp3 * m01 + tmp6 * m11 + tmp11 * m31);
		const t3 =
			tmp5 * m01 +
			tmp8 * m11 +
			tmp11 * m21 -
			(tmp4 * m01 + tmp9 * m11 + tmp10 * m21);

		const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

		dst[0] = d * t0;
		dst[1] = d * t1;
		dst[2] = d * t2;
		dst[3] = d * t3;

		dst[4] =
			d *
			(tmp1 * m10 +
				tmp2 * m20 +
				tmp5 * m30 -
				(tmp0 * m10 + tmp3 * m20 + tmp4 * m30));
		dst[5] =
			d *
			(tmp0 * m00 +
				tmp7 * m20 +
				tmp8 * m30 -
				(tmp1 * m00 + tmp6 * m20 + tmp9 * m30));
		dst[6] =
			d *
			(tmp3 * m00 +
				tmp6 * m10 +
				tmp11 * m30 -
				(tmp2 * m00 + tmp7 * m10 + tmp10 * m30));
		dst[7] =
			d *
			(tmp4 * m00 +
				tmp9 * m10 +
				tmp10 * m20 -
				(tmp5 * m00 + tmp8 * m10 + tmp11 * m20));

		dst[8] =
			d *
			(tmp12 * m13 +
				tmp15 * m23 +
				tmp16 * m33 -
				(tmp13 * m13 + tmp14 * m23 + tmp17 * m33));
		dst[9] =
			d *
			(tmp13 * m03 +
				tmp18 * m23 +
				tmp21 * m33 -
				(tmp12 * m03 + tmp19 * m23 + tmp20 * m33));
		dst[10] =
			d *
			(tmp14 * m03 +
				tmp19 * m13 +
				tmp22 * m33 -
				(tmp15 * m03 + tmp18 * m13 + tmp23 * m33));
		dst[11] =
			d *
			(tmp17 * m03 +
				tmp20 * m13 +
				tmp23 * m23 -
				(tmp16 * m03 + tmp21 * m13 + tmp22 * m23));

		dst[12] =
			d *
			(tmp14 * m22 +
				tmp17 * m32 +
				tmp13 * m12 -
				(tmp16 * m32 + tmp12 * m12 + tmp15 * m22));
		dst[13] =
			d *
			(tmp20 * m32 +
				tmp12 * m02 +
				tmp19 * m22 -
				(tmp18 * m22 + tmp21 * m32 + tmp13 * m02));
		dst[14] =
			d *
			(tmp18 * m12 +
				tmp23 * m32 +
				tmp15 * m02 -
				(tmp22 * m32 + tmp14 * m02 + tmp19 * m12));
		dst[15] =
			d *
			(tmp22 * m22 +
				tmp16 * m02 +
				tmp21 * m12 -
				(tmp20 * m12 + tmp23 * m22 + tmp17 * m02));
		return dst;
	}

	/**
	 * @param {Float32Array} m
	 * @param {Float32Array} [dst]
	 */
	static transpose(m, dst = new Float32Array(16)) {
		// prettier-ignore
		dst[ 0] = m[ 0];
		dst[1] = m[4];
		dst[2] = m[8];
		dst[3] = m[12];
		dst[4] = m[1];
		dst[5] = m[5];
		dst[6] = m[9];
		dst[7] = m[13];
		dst[8] = m[2];
		dst[9] = m[6];
		dst[10] = m[10];
		dst[11] = m[14];
		dst[12] = m[3];
		dst[13] = m[7];
		dst[14] = m[11];
		dst[15] = m[15];

		return dst;
	}

	/**
	 * @param {Float32Array} eye
	 * @param {Float32Array} target
	 * @param {Float32Array} up
	 * @param {Float32Array} [dst]
	 */
	static cameraAim(eye, target, up, dst = new Float32Array(16)) {
		// prettier-ignore
		const zAxis = Vector3Utils.normalize(Vector3Utils.subtract(eye, target));
		const xAxis = Vector3Utils.normalize(Vector3Utils.cross(up, zAxis));
		const yAxis = Vector3Utils.normalize(Vector3Utils.cross(zAxis, xAxis));

		dst[0] = xAxis[0];
		dst[1] = xAxis[1];
		dst[2] = xAxis[2];
		dst[3] = 0;
		dst[4] = yAxis[0];
		dst[5] = yAxis[1];
		dst[6] = yAxis[2];
		dst[7] = 0;
		dst[8] = zAxis[0];
		dst[9] = zAxis[1];
		dst[10] = zAxis[2];
		dst[11] = 0;
		dst[12] = eye[0];
		dst[13] = eye[1];
		dst[14] = eye[2];
		dst[15] = 1;

		return dst;
	}

	/**
	 * @param {Float32Array | number[]} eye
	 * @param {Float32Array | number[]} target
	 * @param {Float32Array | number[]} up
	 * @param {Float32Array} [dst]
	 */
	static lookAt(eye, target, up, dst = new Float32Array(16)) {
		return Matrix4Utils.inverse(
			Matrix4Utils.cameraAim(eye, target, up, dst),
			dst,
		);
	}

	/**
	 * @param {number} tx
	 * @param {number} ty
	 * @param {number} tz
	 * @param {Float32Array} [dst]
	 */
	static translation([tx, ty, tz], dst = new Float32Array(16)) {
		// prettier-ignore
		dst[ 0] = 1;
		dst[1] = 0;
		dst[2] = 0;
		dst[3] = 0;
		dst[4] = 0;
		dst[5] = 1;
		dst[6] = 0;
		dst[7] = 0;
		dst[8] = 0;
		dst[9] = 0;
		dst[10] = 1;
		dst[11] = 0;
		dst[12] = tx;
		dst[13] = ty;
		dst[14] = tz;
		dst[15] = 1;
		return dst;
	}

	/**
	 * @param {number} angleInRadians
	 * @param {Float32Array} [dst]
	 */
	static rotationX(angleInRadians, dst = new Float32Array(16)) {
		const c = Math.cos(angleInRadians);
		const s = Math.sin(angleInRadians);
		// prettier-ignore
		dst[ 0] = 1;
		dst[1] = 0;
		dst[2] = 0;
		dst[3] = 0;
		dst[4] = 0;
		dst[5] = c;
		dst[6] = s;
		dst[7] = 0;
		dst[8] = 0;
		dst[9] = -s;
		dst[10] = c;
		dst[11] = 0;
		dst[12] = 0;
		dst[13] = 0;
		dst[14] = 0;
		dst[15] = 1;
		return dst;
	}

	/**
	 * @param {number} angleInRadians
	 * @param {Float32Array} [dst]
	 */
	static rotationY(angleInRadians, dst = new Float32Array(16)) {
		const c = Math.cos(angleInRadians);
		const s = Math.sin(angleInRadians);
		// prettier-ignore
		dst[ 0] = c;
		dst[1] = 0;
		dst[2] = -s;
		dst[3] = 0;
		dst[4] = 0;
		dst[5] = 1;
		dst[6] = 0;
		dst[7] = 0;
		dst[8] = s;
		dst[9] = 0;
		dst[10] = c;
		dst[11] = 0;
		dst[12] = 0;
		dst[13] = 0;
		dst[14] = 0;
		dst[15] = 1;
		return dst;
	}

	/**
	 * @param {number} angleInRadians
	 * @param {Float32Array} [dst]
	 */
	static rotationZ(angleInRadians, dst = new Float32Array(16)) {
		const c = Math.cos(angleInRadians);
		const s = Math.sin(angleInRadians);
		// prettier-ignore
		dst[ 0] = c;
		dst[1] = s;
		dst[2] = 0;
		dst[3] = 0;
		dst[4] = -s;
		dst[5] = c;
		dst[6] = 0;
		dst[7] = 0;
		dst[8] = 0;
		dst[9] = 0;
		dst[10] = 1;
		dst[11] = 0;
		dst[12] = 0;
		dst[13] = 0;
		dst[14] = 0;
		dst[15] = 1;
		return dst;
	}

	/**
	 * @param {number} sx
	 * @param {number} sy
	 * @param {number} sz
	 * @param {Float32Array} [dst]
	 */
	static scaling([sx, sy, sz], dst = new Float32Array(16)) {
		// prettier-ignore
		dst[ 0] = sx;
		dst[1] = 0;
		dst[2] = 0;
		dst[3] = 0;
		dst[4] = 0;
		dst[5] = sy;
		dst[6] = 0;
		dst[7] = 0;
		dst[8] = 0;
		dst[9] = 0;
		dst[10] = sz;
		dst[11] = 0;
		dst[12] = 0;
		dst[13] = 0;
		dst[14] = 0;
		dst[15] = 1;
		return dst;
	}

	/**
	 * @param {Float32Array} m
	 * @param {Float32Array} [dst]
	 */
	static copy(m, dst = new Float32Array(16)) {
		dst.set(m);

		return dst;
	}

	/**
	 * @param {Float32Array} m
	 * @param {number} tx
	 * @param {number} ty
	 * @param {number} tz
	 * @param {Float32Array} [dst]
	 */
	static translate(m, [tx, ty, tz], dst = m) {
		return Matrix4Utils.multiply(m, Matrix4Utils.translation([tx, ty, tz]), dst);
	}

	/**
	 * @param {Float32Array} m
	 * @param {number} angleInRadians
	 * @param {Float32Array} [dst]
	 */
	static rotateX(m, angleInRadians, dst = m) {
		return Matrix4Utils.multiply(
			m,
			Matrix4Utils.rotationX(angleInRadians),
			dst,
		);
	}

	/**
	 * @param {Float32Array} m
	 * @param {number} angleInRadians
	 * @param {Float32Array} [dst]
	 */
	static rotateY(m, angleInRadians, dst = m) {
		return Matrix4Utils.multiply(
			m,
			Matrix4Utils.rotationY(angleInRadians),
			dst,
		);
	}

	/**
	 * @param {Float32Array} m
	 * @param {number} angleInRadians
	 * @param {Float32Array} [dst]
	 */
	static rotateZ(m, angleInRadians, dst = m) {
		return Matrix4Utils.multiply(
			m,
			Matrix4Utils.rotationZ(angleInRadians),
			dst,
		);
	}

	/**
	 * @param {Float32Array} m
	 * @param {Float32Array} rotationMatrix
	 * @param {Float32Array} [dst]
	 */
	static rotate(m, rotationMatrix, dst = m) {
		return Matrix4Utils.multiply(m, rotationMatrix, dst);
	}

	/**
	 * @param {Float32Array} m
	 * @param {Float32Array} scale
	 * @param {Float32Array} [dst]
	 */
	static scale(m, scale, dst = m) {
		return Matrix4Utils.multiply(m, Matrix4Utils.scaling(scale), dst);
	}

	static fromQuaternion(
		q = new Float32Array([0, 0, 0, 1]),
		dst = new Float32Array(16),
	) {
		const x = q[0];
		const y = q[1];
		const z = q[2];
		const w = q[3];
		const x2 = x + x;
		const y2 = y + y;
		const z2 = z + z;
		const xx = x * x2;
		const yx = y * x2;
		const yy = y * y2;
		const zx = z * x2;
		const zy = z * y2;
		const zz = z * z2;
		const wx = w * x2;
		const wy = w * y2;
		const wz = w * z2;
		dst[0] = 1 - yy - zz;
		dst[1] = yx + wz;
		dst[2] = zx - wy;
		dst[3] = 0;
		dst[4] = yx - wz;
		dst[5] = 1 - xx - zz;
		dst[6] = zy + wx;
		dst[7] = 0;
		dst[8] = zx + wy;
		dst[9] = zy - wx;
		dst[10] = 1 - xx - yy;
		dst[11] = 0;
		dst[12] = 0;
		dst[13] = 0;
		dst[14] = 0;
		dst[15] = 1;
		return dst;
	}
}

export {Matrix4Utils};
