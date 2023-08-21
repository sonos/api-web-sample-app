import { render } from "@testing-library/react";
import { Configuration } from "../museClient/configuration";
import testConfig from "./testConfig.json";
import GetHouseholds from "../UserDetails/getHouseholds";

test("testing the getHouseholds API", () => {
  const testMuseClientConfig = new Configuration({
    accessToken: testConfig.authToken
  });
  hh_handler = () => {
    };

  render(
    <GetHouseholds
      hh_handler={hh_handler}
      museClientConfig={testMuseClientConfig}
    />
  );
});