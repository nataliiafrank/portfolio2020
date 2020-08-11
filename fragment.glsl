#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

// Variable qualifiers that come with the shader
precision highp float;
uniform float opacity;
uniform vec3 color;
uniform sampler2D map;
varying vec2 vUv;
uniform float time;

float median(float r, float g, float b) {
	return max(min(r, g), min(max(r, g), b));
}

void main() {
	// This is the code that comes to produce msdf
	vec3 sample = texture2D(map, vUv).rgb;
	float sigDist = median(sample.r, sample.g, sample.b) - 0.5;
	float alpha = clamp(sigDist/fwidth(sigDist) + 0.5, 0.0, 1.0);

	vec3 newColor = vec3(0.18, 0.18, 0.18);

	gl_FragColor = vec4(newColor, alpha * 1.);
}