import { compiler } from "./compiler";
import { PropertyMap } from "./get-props";
import { Ast } from "svelte/types/compiler/interfaces";
import { Identifier } from "estree";

export interface Types {
  [prop: string]: {
    name: string;
    value?: any;
    defaultValue?: any;
    valueType?: any;
    types?: string[];
  };
}

export function annotateTypes(ast: Ast, props: PropertyMap, source: string) {
  const types: Types = {};
  let currentPropName: null | string = null;

  compiler.walk(ast, {
    leave(node, parent, prop) {
      if (currentPropName != null) {
        switch (node.type) {
          case "ObjectExpression":
            types[currentPropName].value = source.slice(node.start, node.end);
            break;
          case "ArrayExpression":
            types[currentPropName].value = source.slice(node.start, node.end);
            break;
          case "Literal":
            if (parent.type === "VariableDeclarator") {
              types[currentPropName].value = node.value;
            }
            break;
        }

        if (types[currentPropName]) {
          types[currentPropName].valueType = typeof types[currentPropName]
            .value;
        }

        if (node.trailingComments !== undefined) {
          types[currentPropName].defaultValue = types[currentPropName].value;
          types[currentPropName].types = node.trailingComments[0].value
            .replace(/\n/g, "")
            .split("|")
            .map(_ => _.trim());
        }
      }

      if (prop === "id" && props.has((node as Identifier).name)) {
        currentPropName = (node as Identifier).name;
        types[currentPropName] = {
          name: currentPropName,
          value: undefined,
          defaultValue: undefined,
          valueType: undefined,
          types: undefined
        };
      }
    }
  });

  return types;
}
