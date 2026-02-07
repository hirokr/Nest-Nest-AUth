import { Button } from "@/components/ui/button";
import styles from "./page.module.css";
import { getSession } from "@/lib/session";

export default async function Home() {
	const session = await getSession();
	console.log({ session });

	return (
		<main className='flex min-h-screen flex-col items-center p-24 *:p-4'>
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
			<div className='flex flex-col gap-4 mt-4' />
			<Button asChild>
				<a href='/auth/signin'>Signin</a>
			</Button>
		</main>
	);
}
