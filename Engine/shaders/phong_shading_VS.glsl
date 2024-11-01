#version 300 es
precision mediump float;

layout(location=0) in vec3 in_position;
layout(location=1) in vec2 in_texcoord;
layout(location=2) in vec3 in_normal;

uniform mat4 u_mProj;
uniform mat4 u_mView;
uniform mat4 u_mModel;

out vec3 o_positionWV;
out vec3 o_normalWV;
out vec2 o_texcoord;

void main(){
    gl_Position = u_mProj * u_mView * u_mModel * vec4(in_position, 1.0);

    o_positionWV = (u_mView * u_mModel * vec4(in_position, 1.0)).xyz;
    o_normalWV = in_normal;
    //o_normalWV = (u_mView * u_mModel * vec4(in_normal, 0.0)).xyz;
    o_texcoord = in_texcoord;
}