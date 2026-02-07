import { Button } from "@/components/ui/button";
import styles from "./page.module.css";
import { getSession } from "@/lib/session";

export default async function Home() {
	const session = await getSession();
	console.log({ session });

	return (
		<main className={styles.page}>
			<h1 className={styles.title}>Welcome to Nest Auth Tutorial</h1>
			<p className={styles.description}>
				{session
					? `Hello, ${session.user.name}! Your role is ${session.user.role}.`
					: "Please sign in to access your dashboard."}
			</p>
			{!session && (
				<Button asChild>
					<a href='/auth/signin'>Go to Sign In</a>
				</Button>
			)}
		</main>
	);
}
