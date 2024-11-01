import { User } from '@/interface/user';
import { NextResponse } from 'next/server';
import { useState } from 'react';

export default function GET() {
  const [user, setUser] = useState<User>();

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:4000/login', {
      headers: { email, password },
    });
    const data = response.json();
    setUser(await data);
  };

  return NextResponse.json(login);
}
