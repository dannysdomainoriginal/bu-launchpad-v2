import { currentUser } from "@clerk/nextjs/server";

import ProductAssuranceBox from "./ProductAssuranceBox";
import ProductSubmitForm from "./ProductSubmitForm";
import ProductSignInBox from "./ProductSignInBox";

export default async function ProductSubmitFormWrapper() {
  const user = await currentUser();

  if (!user) {
    return <ProductSignInBox />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
      <div>
        <ProductSubmitForm />
      </div>

      <ProductAssuranceBox />
    </div>
  );
}
