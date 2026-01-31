import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ params: string[] }> }
) {
  const { params } = await context.params;
  const width = params?.[0] ? parseInt(params[0], 10) : 800;
  const height = params?.[1] ? parseInt(params[1], 10) : 600;
  const url = `https://picsum.photos/${width}/${height}`;
  return NextResponse.redirect(url);
}
