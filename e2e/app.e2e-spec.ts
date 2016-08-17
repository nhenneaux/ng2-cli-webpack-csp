import { Ng2CliWebpackCspPage } from './app.po';

describe('ng2-cli-webpack-csp App', function() {
  let page: Ng2CliWebpackCspPage;

  beforeEach(() => {
    page = new Ng2CliWebpackCspPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
