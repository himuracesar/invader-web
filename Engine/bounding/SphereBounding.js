/**
 * Bounding sphere in other engines this is named "collider"
 * 
 * @author César Himura
 * @version 1.0
 */
class SphereBounding extends BoundingVolume{
    constructor(vmin, vmax){
        super(vmin, vmax);

        this.radio = 0.0;

        this.ComputeBoundingSphere();
    }

    /**
     * Compute the sphere bounding from minimum and maximum vectors
     */
    ComputeBoundingSphere(){
        var vmin = super.getVectorMin();
        var vmax = super.getVectorMax();
        
	    var position = [
            (vmin[0] + vmax[0]) / 2.0,
            (vmin[1] + vmax[1]) / 2.0,
            (vmin[2] + vmax[2]) / 2.0,
        ]

	    this.radio = (Math.abs(vmax[0] - position[0]) + Math.abs(vmax[1] - position[1]) + Math.abs(vmax[2] - position[2])) / 3.0;

        super.setPosition(position);
    }

    /**
     * Get the radio of the sphere
     * @returns {float} Radio
     */
    getRadio(){
        return this.radio;
    }

    /**
     * Set the radio of the sphere
     * @param {float} radio 
     */
    setRadio(radio){
        this.radio = radio;
    }
}