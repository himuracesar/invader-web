/**
 * Directional Light
 * @author César Himura
 * @version 1.0
 */
class DirectionalLight {
    
    constructor(){
        this.buffer = null;
        this.color = [1.0, 1.0, 1.0, 1.0];
	    this.direction = [1.0, -1.0, -1.0, 0.0];
	    this.enabled = true;
	    this.intensity = 1.0;
        this.indexBuffer = -1;
        this.bindingPoint = -1;
        this.hasChange = false;
    }

    /**
     * Get the color of the light
     * @returns {Vector4} Color of the light
     */
    getColor(){
        return this.color;
    }

    /**
     * Get the direction of the light
     * @returns {Vector3} the direction of the light
     */
    getDirection(){
        return this.direction;
    }

    /**
     * Get if the light is on or off
     * @returns {boolean} On of off light
     */
    isEnabled(){
        return this.enabled;
    }

    /**
     * Get the intensity of the light
     * @returns {float} The intensity of the light
     */
    getIntensity(){
        return this.intensity;
    }

    /**
     * Set the color of the light
     * @param {Vector4} color Color of the light
     */
    setColor(color){
        this.color = color;
        this.hasChange = true;
    }

    /**
     * Set the direction of the light
     * @param {Vector3} direction Direction of the light
     */
    setDirection(direction){
        this.direction = direction;
        this.hasChange = true;
    }

    /**
     * Turn on or off the light
     * @param {boolean} enabled True or false to turn on of off the light
     */
    setEnabled(enabled){
        this.enabled = enabled;
        this.hasChange = true;
    }

    /**
     * Set the intensity of the light
     * @param {float} intensity Intensity of the light
     */
    setIntensity(intensity){
        this.intensity = intensity;
        this.hasChange = true;
    }

    /**
     * Get the index buffer
     * @returns {int} Index Buffer
     */
    getIndexBuffer(){
        return this.indexBuffer;
    }

    /**
     * Set the binding point for uniform buffer object
     * @param {int} bp binding point
     */
    setBindingPoint(bp){
        this.bindingPoint = bp;
    }

    /**
     * Get the binding point
     * @returns the binding point of the uniform buffer object
     */
    getBindingPoint(){
        return this.bindingPoint;
    }

    /**
     * Get a uniform buffer to send the information about material to shader
     * @param pipeline Pipeline where the uniform block is
     * @param nameUbo Name of the uniform block in the program of the pipeline
     * @returns {WebGLBuffer} Uniform buffer to send the information to shader
     */
    getBuffer(pipeline, nameUbo){
        if(this.bindingPoint == -1){
            console.log("binding point in directional light = " + this.bindingPoint);
            return null;
        }

        if(this.buffer == null || this.hasChange){
            this.buffer = webGLengine.createBuffer(gl);
            gl.bindBufferBase(gl.UNIFORM_BUFFER, this.bindingPoint, this.buffer);
            gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array([
                this.direction[0], this.direction[1], this.direction[2], this.direction[3],
                this.color[0], this.color[1], this.color[2], this.color[3],
                this.enabled ? 1 : 0,
                this.intensity,
                0, 0 //padding
            ]), gl.DYNAMIC_DRAW);

            this.indexBuffer = gl.getUniformBlockIndex(pipeline.getProgram(), nameUbo);
            gl.uniformBlockBinding(pipeline.getProgram(), this.indexBuffer, this.bindingPoint);

            gl.bindBuffer(gl.UNIFORM_BUFFER, null);

            this.hasChange = false;
        }

        return this.buffer;
    }
}