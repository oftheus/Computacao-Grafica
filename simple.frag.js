// Q5) Escreva o shader de fragmentos adequado ao programa

export default `#version 300 es
precision highp float;

in vec3 v_color;
out vec4 fragColor;

void main() {
    fragColor = vec4(v_color, 1.0);
}
`;

//precision highp float; define a precisão dos calculos dos floats como alta, oq garante uma maior precisão nos cálculos de cor..

//in vec3 v_color; declara uma entrada pro shader de fragmento, recebendo a cor interpolada de cada pixel q vem do shader de vértice. 'v_color' é do tipo vec3, tendo valores rgb

//out vec4 fragColor; declara a variável de saída do shader de fragmento (fragColor) , que define a cor final do pixel renderizado na tela. Eh do tipo vec4 (rgba)

//void main() {
    //fragColor = vec4(v_color, 1.0); define a cor final do fragmento usando 'v_color' para os componentes rgb e um valor alfa de 1.0, oq indica q o pixel eh opaco
//}
//`;
