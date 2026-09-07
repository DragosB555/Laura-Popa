/** Concateneaza clase CSS, ignorand valorile false / null / undefined. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
