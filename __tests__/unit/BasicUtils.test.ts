import { authenticateUser,product,UserNameToLowerCase } from "../../src/BasicUtils"

describe("BasicUtils test suite ", () => {
    it("should return the product of 3 and 2 ", () => {
        const actual = product(3, 2)
        expect(actual).toBe(6)
         expect(actual).not.toBe(5) // This is a negative test case
        expect(actual).toEqual(6) // This is a positive test case
        expect(actual).toBeLessThan(10) // toBeLessThan is a matcher that checks if the value is less than the expected value
        expect(actual).toBeLessThanOrEqual(6) // toBeLessThanOrEqual is a matcher that checks if the value is less than or equal to the expected value
        expect(actual).toBeGreaterThan(5) // This is a positive test case
        expect(actual).toBeGreaterThanOrEqual(6) // This is a positive test case
        expect(actual).toBeCloseTo(6.0) // This is a positive test case
    })
     describe.only('User authentication test', () => {

        it("Return the lowercase username of a valid user", () => {
            // Arrange
            const sut = authenticateUser // System Under Test
            // Act
            const actual = sut("deveLOPER", "dev") // System Under Test
            // Assert
            expect(actual.usernameToLower).toBe("developer")
        });

        it("Return the username characters of a valid user", () => {
            // Arrange
            const sut = authenticateUser // System Under Test
            // Act
            const actual = sut("deveLOPER", "dev") // System Under Test
            // Assert
            expect(actual.usernameCharacters).toEqual(['d', 'e', 'v', 'e', 'L', 'O', 'P', 'E', 'R'])
        });

        // what is a user enters -   'L', 'O', 'P', 'E', 'R', 'd', 'e', 'v', 'e',,
        it("Return username characters contsains a valid user", () => {
            // Arrange
            const sut = authenticateUser // System Under Test
            // Act
            const actual = sut("deveLOPER", "dev") // System Under Test
            // Assert
            expect(actual.usernameCharacters).toEqual(
                expect.arrayContaining(['L', 'O', 'P', 'E', 'R', 'd', 'e', 'v', 'e']));
        });

        // more matchers
        it("Return userDetails as empty object for a valid user", () => {
            // Arrange
            const sut = authenticateUser // System Under Test
            // Act
            const actual = sut("deveLOPER", "dev") // System Under Test
            // Assert
            expect(actual.userDetails).toEqual({}) // This is a positive test case
            expect(actual.isAuthenticated).toBeDefined()
            expect(actual.isAuthenticated).not.toBeUndefined()
            expect(actual.isAuthenticated).toBeTruthy() // This is a positive test case
            expect(actual.isAuthenticated).not.toBeFalsy() // This is a positive test case
        });
        // Truthy and Falsy
        it("Return isAuthenticated as true for a valid user", () => {
            // Arrange
            const sut = authenticateUser // System Under Test
            // Act
            const actual = sut("deveLOPER", "dev") // System Under Test
            // Assert
            expect(actual.isAuthenticated).toBeTruthy() // This is a positive test case
            expect(actual.isAuthenticated).not.toBeFalsy() // This is a positive test case
        });
    })

      describe.only("UsernameToLowerCase test suite ", () => {
        // setup 
        let sut: UserNameToLowerCase
        beforeEach(() => {
            console.log("Setup is here");
            sut = new UserNameToLowerCase()
        })
        // teardown
        afterEach(() => {
            console.log("Tear down is here");
        })

        it("should return the lowercase username of a valid user", () => {
            const actual = sut.toLowerCase("Bob");
            console.log("I am here");
            expect(actual).toBe("bob")
        })
    })
})
