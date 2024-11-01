/**
 * Pipeline to create custom pipelines and techniques to render
 * @author César Himura
 * @version 1.0
 */
class Pipeline {

    constructor(gl, vertexShaderSource, fragmentShaderSource, vertexFormat){
        this.gl = gl;
        this.vertexShader = webGLengine.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = webGLengine.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = webGLengine.createProgram(gl, this.vertexShader, this.fragmentShader);

        this.vertexFormat = vertexFormat;
    }

    /**
     * Get the vertex shader of the pipeline
     * @returns {GLShader} vertex shader
     */
    getVertexShader(){
        return this.vertexShader;
    }

    /**
     * Get the fragment shader of the pipeline
     * @returns {GLShader} fragment shader
     */
    getFragmentShader(){
        return this.fragmentShader;
    }

    /**
     * Get the program
     * @returns {GLprogram} program that links the shaders
     */
    getProgram(){
        return this.program;
    }

    /**
     * Vertex fomat to conect with the vertex shader
     * @returns {Dictionary} vertex format of the shader
     */
    getVertexFormat(){
        return this.vertexFormat;
    }

    /**
     * Use this pipeline
     */
    use(){
        gl.useProgram(this.program);
    }
}