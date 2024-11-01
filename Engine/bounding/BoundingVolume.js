/**
 * Bounding Volume
 * @author César Himura
 * @version 1.0
 */
class BoundingVolume {
    /**
     * Types
     */
    Type = Object.freeze({
        None : 0,
        Sphere : 1
    });

    constructor(vmin, vmax){
        this.vmin = vmin;
        this.vmax = vmax;
        this.position = [0.0, 0.0, 0.0];
        this.type = this.Type.None;
    }

    /**
     * Get the position of the bounding
     * @returns {Vector3} Position of the bounding
     */
    getPosition(){
        return this.position;
    }

    /**
     * Get the vector min of the bounding
     * @returns {Vector3} Vector min of the bounding
     */
    getVectorMin(){
        return this.vmin;
    }

    /**
     * Get the vector max of the bounding
     * @returns {Vector3} Vector max of the bounding
     */
    getVectorMax(){
        return this.vmax;
    }

    /**
     * Get the type of the bounding volume
     * @returns {BoundingVolume.Type} Type of the bounding volume
     */
    getType(){
        return this.type;
    }

    /**
     * Set the position to the bounding
     * @param {Vector3} position Position of the bounding
     */
    setPosition(position){
        this.position = position;
    }

    /**
     * Set vector min
     * @param {Vector3} vmin Vector min
     */
    setVectorMin(vmin){
        this.vmin = vmin;
    }

    /**
     * Set vector max
     * @param {Vector3} vmax Vector max
     */
    setVectorMax(vmax){
        this.vmax = vmax;
    }

    /**
     * Set the type of the bounding volume
     * @param {BoundingVolume.Type} type Type of the bounding volume
     */
    setType(type){
        this.type = type;
    }
}