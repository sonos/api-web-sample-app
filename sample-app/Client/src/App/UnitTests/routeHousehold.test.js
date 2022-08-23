import { render } from "@testing-library/react";
import OAuthController from "../Controllers/oAuthController";

jest.mock("../Controllers/oAuthController");

test("testing the getHouseholds API", () => {
    OAuthController.mockImplementation(() => <div>OAuthController</div>);
});