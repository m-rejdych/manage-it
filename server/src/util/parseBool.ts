export default (value?: string): boolean | undefined => {
  if (value === undefined) return value as undefined;
  if (value === 'true') return true;
  if (value === 'false') return false;
}
