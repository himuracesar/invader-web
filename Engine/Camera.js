/**
 * Camera 3D to move in a scene
 * @author César Himura
 */
class Camera {

    constructor(gl){
        this.gl = gl;
        this.position = [0.0, 0.0, 0.0];
        this.up = [0.0, 1.0, 0.0, 0.0];
        this.target = [0.0, 0.0, 0.0];
        this.forward = [0.0, 0.0, -1.0, 0.0];
        this.right = [1.0, 0.0, 0.0, 0.0];
        this.yawAngle = 0.0;
        this.pitchAngle = 0.0;
        this.fov = webGLengine.degreeToRadian(60.0);
        this.aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
        this.nearPlane = 0.1;
        this.farPlane = 1000.0;
        this.speed = 0.1;
        this.speedRotation = 0.005;
        this.velocity = [0.0, 0.0, 0.0];
    }

    /**
     * Create the projection matrix
     * @returns {Matrix4} Projection Matrix
     */
    getProjectionMatrix(){
        return m4.perspective(this.fov, this.aspectRatio, this.nearPlane, this.farPlane);
    }

    /**
     * Compute the view matrix o view space. This space is the camera space
     * @returns {Matrix4} View Matrix
     */
    getViewMatrix(){
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[2] += this.velocity[2];

        var mView = m4.translation(this.position[0], this.position[1], this.position[2]);

        var mRotation = m4.multiply(m4.yRotation(this.yawAngle), m4.xRotation(this.pitchAngle));

        mView = m4.multiply(mView, mRotation);

        this.forward = m4.transformVector(mView, [0.0, 0.0, -1.0, 0.0],);
        this.right = m4.transformVector(mView, [1.0, 0.0, 0.0, 0.0],);
        this.up = m4.transformVector(mView, [0.0, 1.0, 0.0, 0.0]);
        
        var cameraMatrix = m4.lookAt([mView[12], mView[13],mView[14]], this.target, this.up);
        //cameraMatrix = m4.multiply(cameraMatrix, mView)

        this.velocity = [0.0, 0.0, 0.0];

        return m4.inverse(mView);
    }
    
    /**
     * Get the position
     * @returns {Vector3} position
     */
    getPosition(){
        return this.position;
    }

    /**
     * Set the position
     * @param {Vector3} position 
     */
    setPosition(position){
        this.position = position;
    }

    /**
     * Set the look at. It's the target where the camera sees
     * @param {Vector4} look 
     */
    setLookAt(look){
        this.target = look;
    }

    /**
     * Set the speed of the camera to move
     * @param {float} speed Speed
     */
    setSpeed(speed){
        this.speed = speed;
    }

    /**
     * Angle for the field of view
     * @param {float} fov Angle in degrees
     */
    setFieldOfView(fov){
        this.fov = webGLengine.degreeToRadian(fov);
    }

    /**
     * Set the aspect ratio
     * @param {float} aspect It's width/height
     */
    setAspectRatio(aspect){
        this.aspectRatio = aspect;
    }

    /**
     * Set the near plane
     * @param {float} near Near plane
     */
    setNearPlane(near){
        this.nearPlane = near;
    }

    /**
     * Set the far plane
     * @param {float} far Far plane
     */
    setFarPlane(far){
        this.farPlane = far;
    }

    /**
     * Set the speed rotation
     * @param {float} v Velocity of speed
     */
    setSpeedRotation(v){
        this.speedRotation = v;
    }

    /**
     * Get the speed rotation of the camera
     * @returns the speed rotation
     */
    getSpeedRotation(){
        return this.speedRotation;
    }

    /**
     * Move units to forward with the speed of the camera
     * @param {float} units Unito to move 
     */
    moveForward(units){
        this.velocity[0] += this.forward[0] * this.speed * units;
        this.velocity[1] += this.forward[1] * this.speed * units;
        this.velocity[2] += this.forward[2] * this.speed * units;
    }

    /**
     * Move the camera units sideways
     * @param {float} units Units to move
     */
    strafe(units){
        this.velocity[0] += this.right[0] * this.speed * units;
        this.velocity[1] += this.right[1] * this.speed * units;
        this.velocity[2] += this.right[2] * this.speed * units;
    }

    /**
     * Move to up or down
     * @param {float} units Units to move
     */
    moveUp(units){
        this.velocity[1] += units * this.speed;
    }

    /**
     * Rotate in yaw
     * @param {float} units Units to rotate
     */
    yaw(units){
        this.yawAngle += units;
    }

    /**
     * Rotate in pitch
     * @param {float} units Units to rotate
     */
    pitch(units){
        this.pitchAngle += units;
    }
}