'use client'
import Link, { LinkProps } from 'next/link';
import { signOut,useSession } from 'next-auth/react';
import { use } from "react";
import { getServerSession } from 'next-auth';

async function getSession() {
    return await getServerSession();
}


const Header =  () => {
    const  {data:session} = useSession();
    const logout = async () =>await signOut();

    return (
        <>
            {session && <div>
                <button type="button" onClick={logout}>Logout</button>
            </div>}
            {!session && <div>
                <Link href='/login'>Login</Link>
            </div>}
        </>
    )
}


export default Header