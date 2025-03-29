export async function GET() {
  const data = { message: 'Hello from Next.js 15 API route!' };
  return Response.json(data);
}
