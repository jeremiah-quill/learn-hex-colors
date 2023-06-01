describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it('clicks the link "play"', () => {
    cy.contains("Play").click();
    cy.url().should("include", "/play");
  });

  it('clicks the link "highscores"', () => {
    cy.contains("Highscores").click();
    cy.url().should("include", "/highscores");
  });

  // TODO: Figure out how to navigate to external links
  // it('clicks the link "github"', () => {
  //   cy.contains("Github").click();
  //   cy.url().should("include", "https://github.com/jeremiah-quill");
  // });

  it("changes background color when color picker is used", () => {
    //
  });
});
