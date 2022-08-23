import { render } from "@testing-library/react";
import CreateAuthToken from "../Authentication/createAuthToken";
import Helper from "../Utility/helper";

test("testing the authentication API", () => {
  const helper = new Helper();
  const sampleCode = "BX48GHe6";
  render(
    <CreateAuthToken
      b64_encoded_string={helper.getB64KeySecretOAuthUrl()}
      code={sampleCode}
    />
  );
});
