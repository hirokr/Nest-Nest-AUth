import { createSession } from "@/lib/session";
import { Role } from "@/lib/type";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { th } from "zod/v4/locales";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const accessToken = searchParams.get("accessToken");
	const refreshToken = searchParams.get("refreshToken");
	const userId = searchParams.get("userId");
	const name = searchParams.get("name");
	const role = searchParams.get("role") as Role;

	if (!accessToken || !refreshToken || !userId || !name || !role) {
		throw new Error("Invalid query parameters");
	}
	await createSession({
		user: {
			id: userId,
			name,
			role: role,
		},
		accessToken,
		refreshToken,
	});

	redirect("/");
}
