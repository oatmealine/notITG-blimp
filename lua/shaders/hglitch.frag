#define PI 3.14159265359
#define TAU 6.28318530718
#define saturate(i) clamp(i,0.,1.)
#define lofi(i,j) (floor((i)/(j))*(j))

// ------

uniform sampler2D sampler0;
uniform sampler2D samplerRandom;

uniform vec2 textureSize;
uniform vec2 imageSize;
uniform float beat;
uniform vec2 resolution;

uniform float amount;

varying vec2 imageCoord;
varying vec4 color;

// ------

vec4 randomV4( float i ) {
  return texture2D( samplerRandom, fract( i / vec2( 7.38, 9.24 ) ) );
}

bool validuv( vec2 v ) { return 0.0 < v.x && v.x < 1.0 && 0.0 < v.y && v.y < 1.0; }

vec2 img2tex( vec2 v ) { return v / textureSize * imageSize; }

// ------

void main() {
  vec2 uv = imageCoord;

  vec4 tex = vec4( 1.0 );
  for ( int i = 0; i < 3; i ++ ) {
    vec2 uv = uv;
    
    if (mod(uv.y,(2.0/resolution.y)) < 0.5)
      uv.x -= 0.2;
    
    if ( validuv( uv ) ) {
      tex[ i ] = texture2D( sampler0, img2tex( saturate( uv ) ) )[ i ];
    }
  }

  gl_FragColor = vec4( tex.xyz, 1.0 );
}