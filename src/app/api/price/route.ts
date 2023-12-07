export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  //   const price = (Math.random() * (10 - 1) + 1).toFixed(2);
  const price = 10.23;
  return Response.json({ destination, price });
}
