import * as serviceWorker from "./serviceWorker"
// @ponicode
describe("serviceWorker.unregister", () => {
    test("0", () => {
        let callFunction: any = () => {
            serviceWorker.unregister()
        }
    
        expect(callFunction).not.toThrow()
    })
})
