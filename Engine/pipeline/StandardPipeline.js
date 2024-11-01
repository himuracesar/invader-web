
/**
 * Standard pipeline. The shaders only draw the position and color of the vertices
 * @author César Himura
 * @version 1.0
 */
class StandardPipeline extends Pipeline {

    constructor(gl){
        var vertexShaderSrc = `#version 300 es
            in vec3 in_position;
            in vec4 in_color;

            uniform mat4 u_mProj;
            uniform mat4 u_mView;
            uniform mat4 u_mModel;

            out vec4 out_color;

            void main(){
                gl_Position = u_mProj * u_mView * u_mModel * vec4(in_position, 1.0);
                out_color = in_color;
            }
        `;

        var fragmentShaderSrc = `#version 300 es
            precision mediump float;

            in vec4 out_color;

            out vec4 color;

            void main(){
                color = out_color;
            }
        `;
    
        let vertexFormat = { "in_position" : 3, "in_color" : 4 };

        super(gl, vertexShaderSrc, fragmentShaderSrc, vertexFormat);

        let attributes = new Map();
        
        var in_position = webGLengine.getAttributeLocation(gl, this.getProgram(), "in_position");
        var in_color = webGLengine.getAttributeLocation(gl, this.getProgram(), "in_color");

        attributes.set("in_position", in_position);
        attributes.set("in_color", in_color);

        this.attributes = attributes;

        let uniforms = new Map();

        var u_mProj = gl.getUniformLocation(this.getProgram(), "u_mProj");
        var u_mView = gl.getUniformLocation(this.getProgram(), "u_mView");
        var u_mModel = gl.getUniformLocation(this.getProgram(), "u_mModel");

        uniforms.set("u_mProj", u_mProj);
        uniforms.set("u_mView", u_mView);
        uniforms.set("u_mModel", u_mModel);

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
    
}