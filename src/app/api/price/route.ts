export async function GET(request: Request) {
  const stations = {
    Waterloo: "2.80£",
    "King's Cross St Pancras": "4.00£",
    "Oxford Circus": "3.20£",
    Victoria: "3.75£",
    "London Bridge": "3.50£",
    "Liverpool Street": "2.90£",
    Stratford: "3.30£",
    Paddington: "3.60£",
    Euston: "3.40£",
    Bank: "3.00£",
    "Piccadilly Circus": "3.10£",
    "Leicester Square": "3.20£",
    "Covent Garden": "3.50£",
    Holborn: "2.70£",
    "Tottenham Court Road": "3.30£",
    "Green Park": "3.40£",
    Westminster: "3.60£",
    "Tower Hill": "3.00£",
    "Camden Town": "2.50£",
    "Baker Street": "3.50£",
    "Canary Wharf": "4.00£",
    "South Kensington": "3.20£",
    "Notting Hill Gate": "3.60£",
    "Earl's Court": "4.50£",
    "St. Pancras International": "3.80£",
  };

  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  if (!destination) {
    return Response.json({ error: "Missing destination" }, { status: 400 });
  }
  const price = stations[destination];
  return Response.json({ destination, price });
}
