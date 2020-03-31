import { compiler } from "./compiler";

export function getAST(source: string) {
  return compiler.parse(source);
}
