/**
 * Texture
 * @author César Himura
 */
class Texture {
    constructor(){
        this.texture = null;
    }

    /**
     * Get the WebGLTexture
     * @returns {WebGLTexture} texture of WebGL
     */
    getTexture(){
        return this.texture;
    }

    /**
     * Set a WebGLTexture
     * @param {WebGLTexture} texture Texture of WebGL
     */
    setTexture(texture){
        this.texture = texture;
    }
}