// Q4) Escreva o shader de vértices adequado ao programa

export default `#version 300 es

in vec2 position;
in vec3 color;
uniform mat4 u_mat;
out vec3 v_color;

void main() {
    gl_Position = u_mat * vec4(position, 0.0, 1.0);
    v_color = color;
}
`;


//#version 300 especifica a versão do glsl que estamos usando, 

//in vec2 position;  declara a entrada (position) do shader de vertices, que recebe a posição de cada vértice. EH do tipo vec2, que representa as coordenadas x e y do vertic no espaço 2D.

//in vec3 color;  declara a entrada (color) do shader de vertices, que recebe a cor de cada vértice, eh do tipo vec3, com componentes rgb.

//uniform mat4 u_mat;  declara o uniform u_mat, que representa uma matriz de transformação 4x4. O uniform indica que o valor será constante p/ tds os vertices durante a execução do shader, oq permite aplicar uma transformação única a tds os vrtice

//out vec3 v_color;  declara a saída v_color - var do tipo vec3 (rgb). Essa var será passada para o shader de fragmentos pra que cada pixel do triângulo seja renderizado com a cor correspondente ao vertice

//void main() {
    //gl_Position = u_mat * vec4(position, 0.0, 1.0);
    // calcula a posição final do vertice aplicando a matriz de transformação u_mat à posição do vértice
    // position é um vec2, então ele é convertido em um vec4, adicionando 0.0 pro eixo Z e 1.0 p/ W,
    // oq permite a multiplicação pela matriz 4x4. A transformação resultante é armazenada em gl_Position,
    // uma var especial que define a posição do vertice na tela

    //v_color = color;
    // atribui a cor do vertce (passada como entrada) à variável de saída v_color, oq permite q o shader de fragmentos use essa cor p pintar os pixels dos triângulos
//}
//`;