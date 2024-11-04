import App from '../App.tsx'
import {screen, render} from "@testing-library/react";

describe("App tests", () => {
    it("should render settings open by default", () => {
        render(<App/>);
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});