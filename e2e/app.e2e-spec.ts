import { HasadProPage } from './app.po';

describe('hasad-pro App', function() {
  let page: HasadProPage;

  beforeEach(() => {
    page = new HasadProPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
