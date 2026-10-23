async function getNumber() {
  return 25;
}

async function main() {
  const result = await getNumber();
  console.log(result);
}

main();