export async function GET(request: Request) {
  const metadata = {
    description: "The only travel pass you'll ever need.",
    image: "https://digipass-ui.vercel.app/nft2.png",
    name: "Digipass",
  };
  return Response.json(metadata);
}
