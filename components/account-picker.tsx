import React from 'react';

import Link from 'next/link';

import { Account } from '@prisma/client';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

function AccountPicker({
  accounts,
}: {
  accounts: Account[];
}) {
  return (
    <Card className="w-[25rem]">
      <CardHeader>
        <CardTitle className="text-md">
          Select an account
        </CardTitle>
        <CardDescription>
          Choose an account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {accounts.map((account) => (
          <Link
            key={account.id}
            href={`/account/${account.id}`}
          >
            <Card className="p-4 hover:bg-muted">
              <h1 className="font-semibold">
                {account.name}
              </h1>
            </Card>
          </Link>
        ))}
      </CardContent>
      <CardFooter>
        <Link href="/add-account">
          <Button className="w-full">
            Add account
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default AccountPicker;
