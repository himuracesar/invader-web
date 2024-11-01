
/**
 * Simple pipeline. The shaders only draw the position and color of the vertices
 * @author César Himura
 * @version 1.0
 */
class SimplePipeline extends Pipeline {

    constructor(gl){
        var vertexShaderSrc = `#version 300 es
            precision mediump float;

            layout(location=0) in vec3 in_position;
            layout(location=1) in vec2 in_texcoord;
            layout(location=2) in vec3 in_normal;

            out vec3 o_normal;
            out vec2 o_texcoord;

            uniform mat4 u_mProj;
            uniform mat4 u_mView;
            uniform mat4 u_mModel;

            void main(){
                gl_Position = u_mProj * u_mView * u_mModel * vec4(in_position, 1.0);
                o_normal = in_normal;
                o_texcoord = in_texcoord;
            }
        `;

        var fragmentShaderSrc = `#version 300 es
            precision mediump float;

            uniform vec4 u_color;

            in vec3 o_normal;
            in vec2 o_texcoord;

            out vec4 color;

            void main(){
                color = u_color;
            }
        `;
    
        let vertexFormat = { "in_position" : 3, "in_texcoord" : 2, "in_normal" : 3 };

        super(gl, vertexShaderSrc, fragmentShaderSrc, vertexFormat);

        let attributes = new Map();
        
        var in_position = webGLengine.getAttributeLocation(gl, this.getProgram(), "in_position");
        var in_texcoord = webGLengine.getAttributeLocation(gl, this.getProgram(), "in_texcoord");
        var in_normal = webGLengine.getAttributeLocation(gl, this.getProgram(), "in_normal");

        attributes.set("in_position", in_position);
        attributes.set("in_texcoord", in_texcoord);
        attributes.set("in_normal", in_normal);

        this.attributes = attributes;

        let uniforms = new Map();

        var u_mProj = gl.getUniformLocation(this.getProgram(), "u_mProj");
        var u_mView = gl.getUniformLocation(this.getProgram(), "u_mView");
        var u_mModel = gl.getUniformLocation(this.getProgram(), "u_mModel");
        var u_color = gl.getUniformLocation(this.getProgram(), "u_color");

        uniforms.set("u_mProj", u_mProj);
        uniforms.set("u_mView", u_mView);
        uniforms.set("u_mModel", u_mModel);
        uniforms.set("u_color", u_color)

        this.uniforms = uniforms;
    }

    /**
     * Use this pipeline
     */
    use(){
        super.use();
    }

    /**
     * Get the program that links the shaders
     * @returns {GLprogram} program
     */
    getProgram(){
        return super.getProgram();
    }

    /**
     * Get the attribute location of the shaders
     * @param {string} attribute Name of the attribute
     * @returns {GLint} attribute location
     */
    getAttributeLocation(attribute){
        return this.attributes.get(attribute);
    }

    /**
     * Get the uniform location of the shaders
     * @param {string} uniform Name of the uniform
     * @returns {GLint} uniform location
     */
    getUniformLocation(uniform){
        return this.uniforms.get(uniform);
    }

    /**
     * Vertex fomat to conect with the vertex shader
     * @returns vertex format of the shader
     */
    getVertexFormat(){
        return this.vertexFormat;
    }

    setColor(color){
        gl.uniform4fv(this.getUniformLocation("u_color"), color);
    }
    
}