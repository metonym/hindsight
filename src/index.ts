import * as fg from "fast-glob";
import * as fs from "fs";
import { formatComponentName } from "./utils";
import { getProps } from "./get-props";
import { getAST } from "./get-ast";
import { annotateTypes, Types } from "./annotate-types";

interface HindsightResults {
  [file: string]: {
    file: string;
    component: string;
    types: Types;
  };
}

async function hindsight(props?: { include?: string[] }) {
  const include = (props && props.include) || ["src/**/*.{svelte,html}"];
  const files = await fg(include, { ignore: ["**/node_modules/**"] });
  const types: HindsightResults = {};

  for (const file of files) {
    const source = fs.readFileSync(file).toString();

    if (!source.length) {
      continue;
    }

    const props = getProps(source);
    const ast = getAST(source);

    types[file] = {
      file,
      component: formatComponentName(file.split("/").pop()!),
      types: annotateTypes(ast, props, source)
    };
  }

  process.stdout.write(`${JSON.stringify(types, null, 2)}\n`);

  return types;
}

async function exec(process: NodeJS.Process) {
  const flags = process.argv.slice(2);

  await hindsight({
    include: !!flags.length ? flags[0].split(",") : undefined
  });
}

export default hindsight;
export { exec };
