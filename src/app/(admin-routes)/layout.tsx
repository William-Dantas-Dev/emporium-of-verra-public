import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { nextAuthOptions } from '@/utils/AuthOptions';

interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession(nextAuthOptions)
	if (!session) {
		
		redirect('/')
	}
	if(session.user.type != "admin"){
		redirect('/')
	}
	
	return <>{children}</>
}