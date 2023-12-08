export async function GET(request: Request) {
  const stations = {
    Waterloo: "2.80£",
    Kings_Cross_St_Pancras: "4.00£",
    Oxford_Circus: "3.20£",
    Victoria: "3.75£",
    London_Bridge: "3.50£",
    Liverpool_Street: "2.90£",
    Stratford: "3.30£",
    Paddington: "3.60£",
    Euston: "3.40£",
    Bank: "3.00£",
    Piccadilly_Circus: "3.10£",
    Leicester_Square: "3.20£",
    Covent_Garden: "3.50£",
    Holborn: "2.70£",
    Tottenham_Court_Road: "3.30£",
    Green_Park: "3.40£",
    Westminster: "3.60£",
    Tower_Hill: "3.00£",
    Camden_Town: "2.50£",
    Baker_Street: "3.50£",
    Canary_Wharf: "4.00£",
    South_Kensington: "3.20£",
    Notting_Hill_Gate: "3.60£",
    Earls_Court: "4.50£",
    St_Pancras_International: "3.80£",
    Bond_Street: "3.40£",
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
