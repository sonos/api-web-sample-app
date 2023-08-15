import { render } from "@testing-library/react";
import GetGroups from "../UserDetails/getGroups";
import { Configuration } from "../museClient/configuration";
import testConfig from "./testConfig.json";
import {RecoilRoot} from 'recoil';

test("testing the getGroups API", () => {
  const testHouseholdID = testConfig.householdID;
  const testMuseClientConfig = new Configuration({
    accessToken: testConfig.authToken
  });
  render(
    <RecoilRoot>
      <GetGroups
        householdId={testHouseholdID}
        museClientConfig={testMuseClientConfig}
      />
    </RecoilRoot>
  );
});
