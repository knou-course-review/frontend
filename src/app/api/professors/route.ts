import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idQuery = searchParams.get("id");
  let endpointUrl: string;

  if (idQuery) {
    endpointUrl = `/api/v1/professor/${idQuery}`;
  } else {
    endpointUrl = "/api/v1/professors";
  }

  try {
    const res = await api.get(endpointUrl);
    if (res.status === 200) {
      const body = await res.json();
      return NextResponse.json(body.data);
    }
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({});
}
