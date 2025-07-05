import terser from '@rollup/plugin-terser';
import MagicString from 'magic-string';
import {existsSync, rmSync} from 'fs';

const outputDir = 'build';

if (existsSync(outputDir)) {
	rmSync(outputDir, {recursive: true, force: true});
}

const year = new Date().getFullYear();

function header() {
	return {
		renderChunk(code) {
			code = new MagicString(code);

			code.prepend(`/**
 * @license
 * Copyright ${year} another-webgpu
 * SPDX-License-Identifier: MIT
 *
 *
 * Partly inherits Three.js code - Copyright 2010-${year} Three.js Authors
 *
 */\n`);

			return {
				code: code.toString(),
				map: code.generateMap(),
			};
		},
	};
}

const builds = [
	{
		input: 'src/another-webgpu.js',
		plugins: [header()],
		output: [
			{
				format: 'esm',
				file: `${outputDir}/another-webgpu.module.js`,
			},
		],
	},
	{
		input: 'src/another-webgpu.js',
		plugins: [header(), terser()],
		output: [
			{
				format: 'esm',
				file: `${outputDir}/another-webgpu.module.min.js`,
			},
		],
	},
	{
		input: 'src/another-webgpu.js',
		plugins: [header()],
		output: [
			{
				format: 'cjs',
				name: 'another-webgpu',
				file: `${outputDir}/another-webgpu.cjs`,
				indent: '\t',
			},
		],
	},
];

export default args => (args.configOnlyModule ? builds[0] : builds);
