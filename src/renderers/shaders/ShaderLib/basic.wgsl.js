const basicShader = `
	struct Model {
		normalMatrix: mat3x3f,
		worldViewProjection: mat4x4f,
	};

	struct Renderer {
		lightDirection: vec3f,
	};

	struct Material {
		color: vec4f,
	};

	struct Vertex {
		@location(0) position: vec4f,
		@location(1) normal: vec3f,
	};

	struct VSOutput {
		@builtin(position) position: vec4f,
		@location(0) normal: vec3f,
	};

	@group(0) @binding(0) var<uniform> renderer: Renderer;
	@group(1) @binding(0) var<uniform> material: Material;
	@group(2) @binding(0) var<uniform> model: Model;

	@vertex fn vs(vert: Vertex) -> VSOutput {
		var vsOut: VSOutput;
		vsOut.position = model.worldViewProjection * vert.position;

		// Orient the normals and pass to the fragment shader
		vsOut.normal = model.normalMatrix * vert.normal;

		return vsOut;
	}

	@fragment fn fs(vsOut: VSOutput) -> @location(0) vec4f {
		let normal = normalize(vsOut.normal);

		let light = dot(normal, -renderer.lightDirection);

		let color = material.color.rgb * light;

		return vec4f(color, material.color.a);
	}
`;

export {basicShader};
