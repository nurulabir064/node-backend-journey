async function getNumber() {
  throw new Error("Number not available");
}

async function main() {
  try {
    const result = await getNumber();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

main();