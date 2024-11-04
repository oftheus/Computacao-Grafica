
import vertShaderSrc from './simple.vert.js';
import fragShaderSrc from './simple.frag.js';

import Shader from './shader.js';

class Scene {
  constructor(gl) {
    this.data = [];

    this.delta = 0;
    this.mat = mat4.create();
    this.matLoc = -1;

    this.vertShd = null;
    this.fragShd = null;
    this.program = null;

    this.vaoLoc = -1;

    this.init(gl);
  }

  init(gl) {
    this.createShaderProgram(gl);
    this.createVAO(gl);
    this.createUniforms(gl);
  }

  createShaderProgram(gl) {
    this.vertShd = Shader.createShader(gl, gl.VERTEX_SHADER, vertShaderSrc);
    this.fragShd = Shader.createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);
    this.program = Shader.createProgram(gl, this.vertShd, this.fragShd);

    gl.useProgram(this.program);
  }

  createUniforms(gl) {
    this.matLoc = gl.getUniformLocation(this.program, "u_mat");
  }

  loadModel() {
    this.data = [
      // posição (x,y)
      0.10, 0.80,
      0.10, 0.90,
      0.25, 0.80,
      0.25, 0.80,
      0.40, 0.90,
      0.40, 0.80,
      0.10, 0.50,
      0.40, 0.80,
      0.10, 0.80,
      0.10, 0.50,
      0.40, 0.50,
      0.40, 0.80,
      0.40, 0.10,
      0.80, 0.50,
      0.40, 0.50,
      0.40, 0.10,
      0.80, 0.10,
      0.80, 0.50,
      0.80, 0.10,
      0.90, 0.10,
      0.80, 0.30,
      // Cor (rgb)
      1.0, 0.0, 0.0, 
      1.0, 0.0, 0.0, 
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
      0.0, 1.0, 1.0,
    ];
  }

  createVAO(gl) {
    this.loadModel();

    var coordsAttributeLocation = gl.getAttribLocation(this.program, "position");
    var colorsAttributeLocation = gl.getAttribLocation(this.program, "color");

    // Criação do VBO (Shader.createBuffer)
    const dataBuffer = Shader.createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(this.data));

    // Criação do VAO
    // Q1) Escreva a implementação da função abaixo, que constroi um VAO contendo informações de posicão e
    // cores, e esteja de acordo com a estrutura do array "this.data"
    this.vaoLoc = Shader.createVAO(gl, coordsAttributeLocation, colorsAttributeLocation, dataBuffer);
  }

  objectTransformation() {
    // Q2) Escreva matrizes de transformação que façam a coleção de triângulos dada em "this.data"
    // a) Estar centrada na posição (0,0)
    // b) Ter largura e altura igual a 1.8
    
    // redefine a matriz p/ a identidade (uma matriz neutra sem transformações)
    mat4.identity(this.mat);
    
    // primeiro aplicamos um escalonamento para ajustar o objeto ao espaço de clip
    // queremos q a largura e altura final do objeto sejam de 1.8
    // como o espaço de clip vai de -1 a 1 (2 unidades), o fator de escala necessário é 1.8 / 2 = 0.9
    const scale = 0.9;
    mat4.scale(this.mat, this.mat, [scale, scale, 1]);
    
    // depois, aplicamos uma translação pra centralizar o objeto em (0,0)
    // o centro atual do objeto está aproximadamente em (0.5, 0.5), mas queremos que ele seja movido p/ (0, 0)
    // como escalamos o objeto por 0.9, precisamos ajustar o deslocamento proporcionalmente
    mat4.translate(this.mat, this.mat, [-0.5, -0.5, 0]);
  }

  draw(gl) {  
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vaoLoc);

    this.objectTransformation();
    gl.uniformMatrix4fv(this.matLoc, false, this.mat);

    // Q3) Implemente o comando dl.drawArrays adequado para o programa em questão

    gl.drawArrays(gl.TRIANGLES, 0, 21);

    // gl.drawArrays é usado para renderizar primitivas a partir dos dados de vértice no buffer
    // neste caso, estamos desenhando uma série de triângulos que formam o objeto desejado

    // parâmetros de gl.drawArrays:
    // - gl.TRIANGLES: indica o tipo de primitiva que será desenhada (triângulos)
    // - 0: indica o índice do primeiro vértice a ser desenhado, que é 0, pq queremos começar do início do buffer
    // - 21: num total de vértices a serem desenhados. Como temos 21 vertices, teremos 7 triângulos (pois cada triângulo precisa de 3 vértices)
  }
}

class Main {
  constructor() {
    const canvas = document.querySelector("#glcanvas");
    this.gl = canvas.getContext("webgl2");

    var devicePixelRatio = window.devicePixelRatio || 1;
    this.gl.canvas.width = 1024 * devicePixelRatio;
    this.gl.canvas.height = 768 * devicePixelRatio;

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.scene = new Scene(this.gl);
  }

  draw() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.scene.draw(this.gl);

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = () => {
  const app = new Main();
  app.draw();
}
