import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <>
      <div>
        <Button asChild>
          <Link href="/sign-up">Not registered?</Link>
        </Button>
      </div>
    </>
  );
};

export default SignIn;
