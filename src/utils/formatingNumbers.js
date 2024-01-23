export default function (N) {
  if (!N) return;
  const toStr = N.toString();
  const ResultN = toStr.slice(
    0,
    toStr.length >= 7
      ? toStr.length - 6
      : toStr.length >= 4
      ? toStr.length - 3
      : toStr.length
  );
  const suffix = ["", "k", "m"];
  return ResultN.concat(suffix[(toStr.length - ResultN.length) / 3]);
}
