export function formatComponentName(name: string) {
  return name.replace(/\.html|.svelte/g, "");
}
