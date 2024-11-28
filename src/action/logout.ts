'use server';
import { cookies } from "next/headers";

export const logout = async () => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('access_token')?.value;

		const result = await fetch(`${process.env.BACKEND_API_URL}/api/users/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"API-Key": process.env.BACKEND_API_KEY as string,
				"Authorization": `Bearer ${token}`
			},
		});

		const { success, response } = await result.json();

		if (!success || !response) {
			return { success: false, response: "Error occurred" };
		}

		if (success) {
			cookieStore.delete('access_token');
		}

		return { success, response };
	} catch (error) {
		console.error(error);
		return { success: false, response: "Error occurred" };
	}
}