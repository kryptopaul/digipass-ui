export async function GET(request: Request) {
  const stations = {
    Waterloo: 280,
    "King's Cross St Pancras": 400,
    "Oxford Circus": 320,
    Victoria: 375,
    "London Bridge": 350,
    "Liverpool Street": 290,
    Stratford: 330,
    Paddington: 360,
    Euston: 340,
    Bank: 300,
    "Piccadilly Circus": 310,
    "Leicester Square": 320,
    "Covent Garden": 350,
    Holborn: 270,
    "Tottenham Court Road": 330,
    "Green Park": 340,
    Westminster: 360,
    "Tower Hill": 300,
    "Camden Town": 250,
    "Baker Street": 350,
    "Canary Wharf": 400,
    "South Kensington": 320,
    "Notting Hill Gate": 360,
    "Earl's Court": 450,
    "St. Pancras International": 380,
  };

  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  if (!destination) {
    return Response.json({ error: "Missing destination" }, { status: 400 });
  }
  // @ts-ignore lmeow
  const price = stations[destination];
  return Response.json({ destination, price });
}
