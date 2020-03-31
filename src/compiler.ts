import * as svelte from "svelte/compiler";
import { Ast } from "svelte/types/compiler/interfaces";
import { Node } from "estree";

interface Walker {
  walk(
    ast: Ast,
    tree: {
      leave: (
        node: Node & { start: number; end: number },
        parent: Node,
        prop: "id" | string,
        index: number
      ) => void;
    }
  ): void;
}

export const compiler = (svelte as unknown) as typeof svelte & Walker;
