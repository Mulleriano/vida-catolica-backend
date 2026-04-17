export default function getLiturgyHexColor(corNome: string): { hex: string; hexTexto: string } {
  const cor = { hex: "", hexTexto: "" };
  switch (corNome.toLowerCase()) {
    case "verde":
      cor.hex = "#3cca5b";
      cor.hexTexto = "#FFFFFF";
    case "roxo":
      cor.hex = "#a819a8";
      cor.hexTexto = "#FFFFFF";

    case "vermelho":
      cor.hex = "#ff3d3d";
      cor.hexTexto = "#FFFFFF";
    case "rosa":
      cor.hex = "#FFC0CB";
      cor.hexTexto = "#191919";
    case "branco":
      cor.hex = "#FFFFFF";
        cor.hexTexto = "#191919";
  }

  return cor;
}
