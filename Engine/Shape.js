
/**
 * Make procedural meshes
 *  + Cube
 *  + Sphere
 *  + Grid
 *  + Cylinder
 * @author César Himura
 * @version 1.0
 */
class Shape {
    constructor(){

    }

    /**
     * Create a cube with the values in the descriptor
     *      Values to create a cube:
     *          - width {float} = Width (x).
     *          - height {float} = Height (y).
     *          - depth {float} = Depth (z).
     * @param {JSON object} descriptor Descriptor of the cube.
     * @returns {StaticMesh} Cube with vertex format { position: 3, texture coords: 2, normal: 3 }
     */
    CreateCube(descriptor){
		var w2 = 0.5 * descriptor.width;
		var h2 = 0.5 * descriptor.height;
		var d2 = 0.5 * descriptor.depth;

        // position(3), texture(2), normal(3)
        var _vertices = new Float32Array([
            //Front
            -w2, -h2, d2, 0.0, 1.0, 0.0, 0.0, 1.0, //0
             w2, -h2, d2, 1.0, 1.0, 0.0, 0.0, 1.0, //1
             w2,  h2, d2, 1.0, 0.0, 0.0, 0.0, 1.0, //2
            -w2,  h2, d2, 0.0, 0.0, 0.0, 0.0, 1.0, //3
            //Right
             w2, -h2,  d2, 0.0, 1.0, 1.0, 0.0, 0.0, //4
             w2, -h2, -d2, 1.0, 1.0, 1.0, 0.0, 0.0, //5
             w2,  h2, -d2, 1.0, 0.0, 1.0, 0.0, 0.0, //6
             w2,  h2,  d2, 0.0, 0.0, 1.0, 0.0, 0.0, //7
            //Back
             w2, -h2, -d2, 0.0, 1.0, 0.0, 0.0, -1.0, //8
            -w2, -h2, -d2, 1.0, 1.0, 0.0, 0.0, -1.0, //9
            -w2,  h2, -d2, 1.0, 0.0, 0.0, 0.0, -1.0, //10
             w2,  h2, -d2, 0.0, 0.0, 0.0, 0.0, -1.0, //11
            //Left
            -w2, -h2, -d2, 0.0, 1.0, -1.0, 0.0, 0.0, //12
            -w2, -h2,  d2, 1.0, 1.0, -1.0, 0.0, 0.0, //13
            -w2,  h2,  d2, 1.0, 0.0, -1.0, 0.0, 0.0, //14
            -w2,  h2, -d2, 0.0, 0.0, -1.0, 0.0, 0.0, //15
            //Top
            -w2,  h2,  d2, 0.0, 1.0, 0.0, 1.0, 0.0, //16
             w2,  h2,  d2, 1.0, 1.0, 0.0, 1.0, 0.0, //17
             w2,  h2, -d2, 1.0, 0.0, 0.0, 1.0, 0.0, //18
            -w2,  h2, -d2, 0.0, 0.0, 0.0, 1.0, 0.0, //19
            //Bottom
            -w2, -h2, -d2, 0.0, 1.0, 0.0, -1.0, 0.0, //20
             w2, -h2, -d2, 1.0, 1.0, 0.0, -1.0, 0.0, //21
             w2, -h2,  d2, 1.0, 0.0, 0.0, -1.0, 0.0, //22
            -w2, -h2,  d2, 0.0, 0.0, 0.0, -1.0, 0.0  //23
        ]);

        var indices = new Uint16Array([
            //Front
            0, 1, 2, 0, 2, 3,
            //Right
            4, 5, 6, 4, 6, 7,
            //Back
            8, 9, 10, 8, 10, 11,
            //Left
            12, 13, 14, 12, 14, 15,
            //Top
            16, 17, 18, 16, 18, 19,
            //Bottom
            20, 21, 22, 20, 22, 23
        ]);

        let vertexFormat = { "in_position" : 3, "in_texcoord" : 2, "in_normal" : 3 };
        var mesh = webGLengine.createMesh(gl, _vertices, indices, vertexFormat);

        return mesh;
    }

    /**
     * Create a sphere with the values in the descriptor
     *      Values to create a sphere
     *          - radio {float} = Radio.
     *          - stacks {float} = Divisions in x.
     *          - slices {float} = Divisions in z.
     * @param {JSON object} descriptor Descriptor of the sphere.
     * @returns {StaticMesh} Sphere with vertex format { position: 3, texture coords: 2, normal: 3 }
     */
    CreateSphere(descriptor){
        //var numVerts = (descriptor.stacks - 1) * (descriptor.slices + 1) + 2;

        var _vertices = [];

        //position
        _vertices.push(0.0);
		_vertices.push(descriptor.radio);
		_vertices.push(0.0);
        //uv
        _vertices.push(0.0);
		_vertices.push(0.0);
        //normal
		_vertices.push(0.0);
		_vertices.push(1.0);
		_vertices.push(0.0);

        var phiStep = Math.PI / descriptor.stacks;
        var thetaStep = 2.0 * Math.PI / descriptor.slices;

        for (var i = 1; i <= descriptor.stacks - 1; ++i)
        {
            var phi = i * phiStep;
    
            // _vertices of ring.
            for (var j = 0; j <= descriptor.slices; ++j)
            {
                var theta = j * thetaStep;

                var verts = [
                    descriptor.radio * Math.sin(phi) * Math.cos(theta), 
                    descriptor.radio * Math.cos(phi),
                    descriptor.radio * Math.sin(phi) * Math.sin(theta)
                ];

                //position
                _vertices.push(verts[0]);
                _vertices.push(verts[1]);
                _vertices.push(verts[2]);
                //uv
                _vertices.push(theta / (2 * Math.PI));
                _vertices.push(phi / Math.PI);
                //normal
                var normal = [verts[0], verts[1], verts[2]];
                normal = m4.normalize(normal);
                _vertices.push(normal[0]);
                _vertices.push(normal[1]);
                _vertices.push(normal[2]);
            }
        }

        //position
        _vertices.push(0.0);
		_vertices.push(-descriptor.radio);
		_vertices.push(0.0);
        //uv
        _vertices.push(0.0);
		_vertices.push(1.0);
        //normal
		_vertices.push(0.0);
		_vertices.push(-1.0);
		_vertices.push(0.0);

        var vertices = new Float32Array(_vertices);

        //
        // Compute _indices for top stack.  The top stack was written first to the vertex buffer
        // and connects the top pole to the first ring.
        //
        var _indices = [];
        for (var i = 1; i <= descriptor.slices; ++i)
        {
            _indices.push(0);
            _indices.push(i + 1);
            _indices.push(i);
        }
    
        //
        // Compute _indices for inner stacks (not connected to poles).
        //
    
        // Offset the _indices to the index of the first vertex in the first ring.
        // This is just skipping the top pole vertex.
        var baseIndex = 1;
        var ringVertexCount = descriptor.slices + 1;
        for (var i = 0; i < descriptor.stacks - 2; ++i)
        {
            for (var j = 0; j < descriptor.slices; ++j)
            {
                _indices.push(baseIndex + i * ringVertexCount + j);
                _indices.push(baseIndex + i * ringVertexCount + j + 1);
                _indices.push(baseIndex + (i + 1) * ringVertexCount + j);
    
                _indices.push(baseIndex + (i + 1) * ringVertexCount + j);
                _indices.push(baseIndex + i * ringVertexCount + j + 1);
                _indices.push(baseIndex + (i + 1) * ringVertexCount + j + 1);
            }
        }
    
       /**
        * Compute indices for bottom stack.  The bottom stack was written last to the vertex buffer
        * and connects the bottom pole to the bottom ring.
        */
    
        // South pole vertex was added last.
        var southPoleIndex = _vertices.length - 1;
    
        // Offset the _indices to the index of the first vertex in the last ring.
        baseIndex = southPoleIndex - ringVertexCount;
    
        for (var i = 0; i < descriptor.slices; ++i)
        {
            _indices.push(southPoleIndex);
            _indices.push(baseIndex + i);
            _indices.push(baseIndex + i + 1);
        }
    
        var numindices = _indices.length;

        var indices = new Uint16Array(_indices);

        let vertexFormat = { "in_position" : 3, "in_texcoord" : 2, "in_normal" : 3 };
        var mesh = webGLengine.createMesh(gl, vertices, indices, vertexFormat);

        return mesh;
    }

    /**
     * Create a grid in the xz plane with the values in the descriptor
     *      Values to create a grid
     *          - numVertRows {int} = Number of vertices by row.
     *          - numVertCols {int} = Number of vertices by column.
     *          - delta {Vector3} = Separation between the different components of the axis.
     *          - position {Vector3} = Position.
     *          - texScale {float} = Scale of texture coordinates.
     * @param {JSON object} descriptor Descriptor of the grid
     * @returns {StaticMesh} Grid with vertex format { position: 3, texture coords: 2, normal: 3 }
     */
    CreateGrid(descriptor){
        //var numVertices = descriptor.numVertRows * descriptor.numVertCols;
        var numCellRows = descriptor.numVertRows - 1;
        var numCellCols = descriptor.numVertCols - 1;

        var numTris = numCellRows * numCellCols * 2;

        var width = numCellCols * descriptor.delta[0];
        var depth = numCellRows * descriptor.delta[2];

        var xZero = descriptor.position[0] - width * 0.5;
        var zZero = descriptor.position[2] + depth * 0.5;

        var _vertices = [];

        for (var i = 0; i < descriptor.numVertRows; ++i)
        {
            for (var j = 0; j < descriptor.numVertCols; ++j)
            {
                _vertices.push(xZero + j * descriptor.delta[0]);
				_vertices.push(descriptor.position[1]);
				_vertices.push(zZero + i * -descriptor.delta[2]);
				
				_vertices.push(j * descriptor.texScale);
				_vertices.push(i * descriptor.texScale);

                _vertices.push(0.0);
                _vertices.push(1.0);
                _vertices.push(0.0);
            }
        }

        var numCellRows = descriptor.numVertRows - 1;
		var numCellCols = descriptor.numVertCols - 1;

		var numTris = numCellRows * numCellCols * 2;

		var numIndices = numTris * 3;

		var _indices = [];

		// Generate indices for each quad.
		var k = 0;
		for (var i = 0; i < numCellRows; ++i)
		{
			for (var j = 0; j < numCellCols; ++j)
			{
				_indices[k] = i * descriptor.numVertCols + j;
				_indices[k + 1] = i * descriptor.numVertCols + j + 1;
				_indices[k + 2] = (i + 1) * descriptor.numVertCols + j;

				_indices[k + 3] = (i + 1) * descriptor.numVertCols + j;
				_indices[k + 4] = i * descriptor.numVertCols + j + 1;
				_indices[k + 5] = (i + 1) * descriptor.numVertCols + j + 1;

				// next quad
				k += 6;
			}
		}

        var vertices = new Float32Array(_vertices);
        var indices = new Uint16Array(_indices);

        let vertexFormat = { "in_position" : 3, "in_texcoord" : 2, "in_normal" : 3 };
        var mesh = webGLengine.createMesh(gl, vertices, indices, vertexFormat);

        return mesh;
    }

    /**
     * Builds a cylinder mesh.
     *      Values to create a cylinder
     *          - slices {int} = Division of both caps
     *          - stacks {int} = Division of body
     *          - bottomRadio {float} = Bottom radio
     *          - topRadio {float} = Top radio
     *          - height {float} = Height
     * @param {JSON object} descriptor Descriptor of the cylinder
     * @returns {StaticMesh} Cylinder with vertex format { position: 3, texture coords: 2, normal: 3 }
     */
    CreateCylinder(descriptor){
        //
        // Build Stacks.
        // 
        var stackHeight = descriptor.height / descriptor.stacks;

        // Amount to increment radius as we move up each stack level from bottom to top.
        var radioStep = (descriptor.topRadio - descriptor.bottomRadio) / descriptor.stacks;

        var ringCount = descriptor.stacks + 1;

        var numVerts = ringCount * (descriptor.slices + 1) + (descriptor.slices + 2) * 2;

        var numVertices = 0;

        var _vertices = [];

        // Compute vertices for each stack ring starting at the bottom and moving up.
        for (var i = 0; i < ringCount; ++i)
        {
            var y = -0.5 * descriptor.height + i * stackHeight;
            var r = descriptor.bottomRadio + i * radioStep;
    
            // vertices of ring
            var theta = 2.0 * Math.PI / descriptor.slices;
            for (var j = 0; j <= descriptor.slices; ++j)
            {
                var c = Math.cos(j * theta);
                var s = Math.sin(j * theta);

                // Cylinder can be parameterized as follows, where we introduce v
                // parameter that goes in the same direction as the v tex-coord
                // so that the bitangent goes in the same direction as the v tex-coord.
                //   Let r0 be the bottom radius and let r1 be the top radius.
                //   y(v) = h - hv for v in [0,1].
                //   r(v) = r1 + (r0-r1)v
                //
                //   x(t, v) = r(v)*cos(t)
                //   y(t, v) = h - hv
                //   z(t, v) = r(v)*sin(t)
                // 
                //  dx/dt = -r(v)*sin(t)
                //  dy/dt = 0
                //  dz/dt = +r(v)*cos(t)
                //
                //  dx/dv = (r0-r1)*cos(t)
                //  dy/dv = -h
                //  dz/dv = (r0-r1)*sin(t)

                //position
                _vertices.push(r * c);
                _vertices.push(y);
                _vertices.push(r * s);

                // This is unit length.
                var T = [-s, 0.0, c];

                var dr = descriptor.bottomRadio - descriptor.topRadio;
                var B = [dr * c, -descriptor.height, dr * s];

                var normal = m4.cross(T, B);
                normal = m4.normalize(normal);

                //uv
                _vertices.push(j / descriptor.slices);
                _vertices.push(1.0 - i / descriptor.stacks);
                //normal
                _vertices.push(normal[0]);
                _vertices.push(normal[1]);
                _vertices.push(normal[2]);

                numVertices++;
            }
        }

        // Add one because we duplicate the first and last vertex per ring
        // since the texture coordinates are different.
        var ringVertexCount = descriptor.slices + 1;

        var _indices = [];

        // Compute indices for each stack.
        for (var i = 0; i < descriptor.stacks; ++i)
        {
            for (var j = 0; j < descriptor.slices; ++j)
            {
                _indices.push(i * ringVertexCount + j);
                _indices.push((i + 1) * ringVertexCount + j);
                _indices.push((i + 1) * ringVertexCount + j + 1);

                _indices.push(i * ringVertexCount + j);
                _indices.push((i + 1) * ringVertexCount + j + 1);
                _indices.push(i * ringVertexCount + j + 1);
            }
        }
        
        this.BuildCylinderTopCap(descriptor, _vertices, _indices, numVertices);

        /**
         * JavaScript does not support parameter by reference but objects parameters. So we have to recalculate
         * the exact number of vertices.
         * The number 8 is the number of elements that belong to the vertex format
         *  3 -> position
         *  2 -> tex coordinates
         *  3 -> normal
         * The total sum is 8
         * 
         * To become this value dynamic is necessary to add the vertex format in the decriptor, read and sum it.
         */
        numVertices = _vertices.length / 8;

        this.BuildCylinderBottomCap(descriptor, _vertices, _indices, numVertices);

        var vertices = new Float32Array(_vertices);
        var indices = new Uint16Array(_indices);

        let vertexFormat = { "in_position" : 3, "in_texcoord" : 2, "in_normal" : 3 };
        var mesh = webGLengine.createMesh(gl, vertices, indices, vertexFormat);

        return mesh;
    }

    /**
     * Builds the top cap of the cylinder
     * @param {JSON object} descriptor Descriptor of the cylinder
     * @param {Array} vertices List of vertices
     * @param {Array} indices List of indices
     * @param {int} numVertices Number of vertices in the moment no total pre-calculated
     */
    BuildCylinderTopCap(descriptor, vertices, indices, numVertices){
        var baseIndex = numVertices;

        var y = 0.5 * descriptor.height;
        var theta = 2.0 * Math.PI / descriptor.slices;

        // Duplicate cap ring vertices because the texture coordinates and normals differ.
        for (var i = 0; i <= descriptor.slices; ++i)
        {
            var x = descriptor.topRadio * Math.cos(i * theta);
            var z = descriptor.topRadio * Math.sin(i * theta);

            // Scale down by the height to try and make top cap texture coord area
            // proportional to base.
            var u = x / descriptor.height + 0.5;
            var v = z / descriptor.height + 0.5;

            //position
			vertices.push(x);
			vertices.push(y);
			vertices.push(z);
            //uv
            vertices.push(u);
			vertices.push(v);
            //normal
			vertices.push(0.0);
			vertices.push(1.0);
			vertices.push(0.0);

            numVertices++;
        }

        //position
        vertices.push(0.0, y, 0.0);
        //uv
		vertices.push(0.5, 0.5);
        //normal
        vertices.push(0.0, 1.0, 0.0);

        numVertices++;

        // Index of center vertex.
        var centerIndex = numVertices - 1;

        for (var i = 0; i < descriptor.slices; ++i)
        {
            indices.push(centerIndex);
            indices.push(baseIndex + i + 1);
            indices.push(baseIndex + i);
        }
    }

    /**
     * Builds the top bottom of the cylinder
     * @param {JSON object} descriptor Descriptor of the cylinder
     * @param {Array} vertices List of vertices
     * @param {Array} indices List of indices
     * @param {int} numVertices Number of vertices in the moment no total pre-calculated
     */
    BuildCylinderBottomCap(descriptor, vertices, indices, numVertices){
        // 
        // Build bottom cap.
        //
        var baseIndex = numVertices;
        var y = -0.5 * descriptor.height;

        // vertices of ring
        var theta = 2.0 * Math.PI / descriptor.slices;
        for (var i = 0; i <= descriptor.slices; ++i)
        {
            var x = descriptor.bottomRadio * Math.cos(i * theta);
            var z = descriptor.bottomRadio * Math.sin(i * theta);

            // Scale down by the height to try and make top cap texture coord area
            // proportional to base.
            var u = x / descriptor.height + 0.5;
            var v = z / descriptor.height + 0.5;

            // Scale down by the height to try and make top cap texture coord area
			// proportional to base.
			var u = x / descriptor.height + 0.5;
			var v = z / descriptor.height + 0.5;

            //position
			vertices.push(x);
			vertices.push(y);
			vertices.push(z);
            //texcoords
            vertices.push(u);
			vertices.push(v);
            //normal
			vertices.push(0.0);
			vertices.push(-1.0);
			vertices.push(0.0);
			
            numVertices++;
        }

        //position
        vertices.push(0.0, y, 0.0);
		//uv
		vertices.push(0.5, 0.5);
        //normal
        vertices.push(0.0, -1.0, 0.0);

        // Cache the index of center vertex.
        var centerIndex = numVertices;

        for (var i = 0; i < descriptor.slices; ++i)
        {
            indices.push(centerIndex);
            indices.push(baseIndex + i);
            indices.push(baseIndex + i + 1);
        }
    }
}