export default class Shader {
  static createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var info = gl.getShaderInfoLog(shader);
      console.log('Could not compile WebGL program:' + info);
    }

    return shader;
  }

  static createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var info = gl.getProgramInfoLog(program);
      console.log('Could not compile WebGL program:' + info);
    }

    return program;
  }

  static isArrayBuffer(value) {
    return value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined;
  }

  static createBuffer(gl, type, data) {
    if (data.length == 0)
      return null;

    if (!Shader.isArrayBuffer(data)) {
      console.warn('Data is not an instance of ArrayBuffer');
      return null;
    }

    var buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, data, gl.STATIC_DRAW);

    return buffer;
  }

  static createVAO(gl, posAttribLoc, colorAttribLoc, dataBuffer = null) {
    // cria um VAO pra armazenar as configs de atributos e o buffer associado.
    const vao = gl.createVertexArray();
    
    // vincula o VAO ao contexto webgl. A partir desse ponto, todas as configs de atributo e buffer serão armazenadas nesse VAO, o que permite que ele seja reutilizado facilmente em outros momentos.
    gl.bindVertexArray(vao);
    
    // vincula o buffer de dados ao ARRAY_BUFFER. Esse buffer tem os dados de posição e cor dos vértices
    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    
    // configuração do atributo de posição:
    // esse atributo representa as coordenadas (x, y) de cada vértice no espaço 2D
    gl.enableVertexAttribArray(posAttribLoc); // habilita o atributo de posição para o uso pelo shader
    
    gl.vertexAttribPointer(
        posAttribLoc,    // localização do atributo de posição no shader (identificada anteriormente)
        2,               // num de componentes por vértice (x, y) -> 2 componentes para a posição
        gl.FLOAT,        // tipo de dado dos componentes (float)
        false,           // normalizar eh false, pq os valores de posição não precisam ser normalizados
        0,               // stride eh 0, pq os dados de posição estão em um bloco contínuo sem intercalar com cores
        0                // offset eh 0, pq os dados de posição começam no início do buffer
    );
    
    // config do atributo de cor:
    // esse atributo representa a cor (r, g, b) de cada vértice.
    gl.enableVertexAttribArray(colorAttribLoc); // habilita o atributo de cor para o uso pelo shader.
    
    gl.vertexAttribPointer(
        colorAttribLoc,  // localização do atributo de cor no shader (identificada anteriormente).
        3,               // num de componentes por vértice (r, g, b) -> 3 componentes para a cor.
        gl.FLOAT,        // tipo de dado dos componentes (float).
        false,           // normalizar eh false, pq os vals de cor já estão no formato correto (0.0 a 1.0).
        0,               // stride eh 0, pq os dados de cor estão em um bloco contínuo e separado das posições.
        42 * 4           // offset eh 42 * 4 bytes, pq o bloco de dados de cor começa após os 42 floats de posição (cada float ocupa 4 bytes, então 42 floats de posição ocupam 42 * 4 = 168 bytes)
    );
    
    // retorna o VAO configurado. Esse VAO agora tem todas as informações de configuração dos atributos e do buffer associado, e pode ser facilmente reutilizado no futuro pra desenhar o objeto.
    return vao;
  }

}