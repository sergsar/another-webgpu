import terser from '@rollup/plugin-terser';
import MagicString from 'magic-string';

function header() {
	return {
		renderChunk(code) {
			code = new MagicString(code);

			code.prepend(`/**
 * @license
 * Copyright 2024 another-webgpu
 * SPDX-License-Identifier: MIT
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
				file: 'build/another-webgpu.module.js',
			},
		],
	},
	{
		input: 'src/another-webgpu.js',
		plugins: [header(), terser()],
		output: [
			{
				format: 'esm',
				file: 'build/another-webgpu.module.min.js',
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
				file: 'build/another-webgpu.cjs',
				indent: '\t',
			},
		],
	},
];

export default args => (args.configOnlyModule ? builds[0] : builds);
