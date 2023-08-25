import { render, screen } from "@testing-library/react";
import GetGroups from "../UserDetails/getGroups";
import { Configuration } from "../museClient/configuration";
import testConfig from "./testConfig.json";
import {RecoilRoot} from 'recoil';
import '@testing-library/jest-dom';

test("testing the getGroups API", () => {
  const testHouseholdID = testConfig.householdID;
  const testMuseClientConfig = new Configuration({
    accessToken: testConfig.authToken
  });
  render(
    <RecoilRoot>
      <GetGroups
        showLoadingScreen={true}
        householdId={testHouseholdID}
        museClientConfig={testMuseClientConfig}
      />
    </RecoilRoot>
  );
  expect(screen.getByTestId('custom-element')).toBeVisible();
});
