import {composeVertexData} from './composeVertexData.js';
import {QuaternionUtils} from '../math/QuaternionUtils.js';
import {Mesh} from '../objects/Mesh.js';
import {Geometry} from '../core/Geometry.js';
import {Quaternion} from '../math/Quaternion.js';
import {ArrayUtils} from './ArrayUtils.js';
import {UnitUtils} from './UnitUtils.js';

class FbxUtils {
	/**
	 * @param {number[]} indices
	 */
	static convertPolyIndexToTriangles(indices) {
		let start = 0;
		let triangle = 0;
		/** @type {number[]} **/
		const result = [];
		for (let i = 0; i < indices.length; i++) {
			const end = indices[i] < 0;
			const index = end ? ~indices[i] : indices[i];
			result.push(index);
			if (end) {
				start = i + 1;
			} else if ((i - triangle) % 3 === 2) {
				triangle++;
				i--;
				result.push(indices[start]);
			}
		}
		return result;
	}

	/**
	 * @param {number[]} indices
	 * @param {number[]} positions
	 * @param {number[]} normals
	 */
	static populateVertexData(indices, positions, normals) {
		const result = {
			/** @type {number[]} **/
			indices: [],
			/** @type {number[]} **/
			positions: [],
			/** @type {number[]} **/
			normals: [],
		};
		for (let i = 0; i < indices.length; i++) {
			const end = indices[i] < 0;
			const index = end ? ~indices[i] : indices[i];
			const triIndex = index * 3;
			const normalTriIndex = i * 3;
			const position = positions.slice(triIndex, triIndex + 3);
			const normal = normals.slice(normalTriIndex, normalTriIndex + 3);
			result.indices.push(end ? ~i : i);
			result.positions.push(...position);
			result.normals.push(...normal);
		}
		return result;
	}

	/**
	 * @param tree
	 */
	static getTransformationFromFbxTree(tree) {
		const {Objects: {Model = {}} = {}} = tree || {};
		const [modelNode = {}] = Object.values(Model);
		const {
			Lcl_Rotation: {value: rotation = [0, 0, 0]} = {},
			Lcl_Scaling: {value: scaling = [1, 1, 1]} = {},
			Lcl_Translation: {value: translation = [0, 0, 0]} = {},
		} = modelNode;
		return {translation, rotation, scaling};
	}

	/**
	 * @param tree
	 * @returns {GeometryData}
	 */
	static convertFbxTreeToGeometryData(tree) {
		const {Objects: {Geometry = {}} = {}} = tree || {};
		const [geometryNode = {}] = Object.values(Geometry);
		const {
			PolygonVertexIndex: {a: indices = []} = {},
			Vertices: {a: positions = []} = {},
			LayerElementNormal = {},
		} = geometryNode || {};
		const [{Normals: {a: normals = []} = {}} = {}] =
			Object.values(LayerElementNormal);

		if (!(indices.length && positions.length && normals.length)) {
			console.error('Failed when converting FBXTree');
			return {vertex: new Float32Array([]), index: new Uint16Array([])};
		}

		const populated = FbxUtils.populateVertexData(indices, positions, normals);
		const triIndices = ArrayUtils.extendArrayToMultipleOfFour(
			FbxUtils.convertPolyIndexToTriangles(populated.indices),
		);

		const vertex = composeVertexData({
			positions: populated.positions,
			normals: populated.normals,
		});

		return {
			vertex: new Float32Array(vertex),
			index: new Uint16Array(triIndices),
		};
	}

	/**
	 * @param tree
	 */
	static convertFbxTreeToMesh(tree) {
		const geometryData = this.convertFbxTreeToGeometryData(tree);
		const geometry = new Geometry(geometryData);
		const {translation, rotation, scaling} =
			this.getTransformationFromFbxTree(tree);
		const quaternion = QuaternionUtils.fromEuler(
			UnitUtils.degToRad(rotation[0]),
			UnitUtils.degToRad(rotation[1]),
			UnitUtils.degToRad(rotation[2]),
			'zyx', // FBX default order is zyx
		);
		const mesh = new Mesh({geometry});
		mesh.position.set(translation[0], translation[1], translation[2]);
		mesh.scale.set(scaling[0], scaling[1], scaling[2]);
		mesh.quaternion = new Quaternion(...quaternion);
		return mesh;
	}
}

export {FbxUtils};
