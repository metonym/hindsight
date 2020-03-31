import { compiler } from "./compiler";

type VariableName = string;

export type PropertyMap = Map<VariableName, VariableName>;

export function getProps(source: string) {
  const { vars } = compiler.compile(source);
  const map: PropertyMap = new Map();

  vars
    .filter(({ writable }) => writable)
    .forEach(({ name }) => {
      map.set(name, name);
    });

  return map;
}
