import { render } from "@testing-library/react";
import { Configuration } from "../museClient/configuration";
import testConfig from "./testConfig.json";
import GetHousehold from "../UserDetails/getHouseholdID";

test("testing the getHouseholds API", () => {
  const testMuseClientConfig = new Configuration({
    accessToken: testConfig.authToken
  });
  render(
    <GetHousehold
      museClientConfig={testMuseClientConfig}
    />
  );
});