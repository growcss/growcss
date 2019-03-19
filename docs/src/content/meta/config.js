const base = {
  name: 'GrowCss docs',
  url: 'https://growcss.com'
};

const config = {
  /* meta tags */
  siteTitle: `${base.name} - a set of starters for Gatsby.js`,
  siteTitlePostfix: ` - ${base.name}`,
  siteDescription: `${
    base.name
  } is a set of starters: Minimal, Equipped, Themed, Website, Blog.`,
  siteImage: 'preview.jpg',
  siteLanguage: 'en',

  /* site header */
  headerTitle: `${base.name}`,
  headerSubTitle: 'a set of starters for Gatsby.js',

  /* url */
  siteUrl: base.url,
  // pathPrefix: '',

  /* manifest */
  manifestName: `${base.name}`,
  manifestShortName: 'GrowCss', // max 12 characters
  manifestStartUrl: '/index.html',
  manifestBackgroundColor: '#ffffff',
  manifestThemeColor: '#ffffff',
  manifestDisplay: 'standalone',
  manifestIcon: 'src/content/images/icon.png',

  /* Twitter */
  twitter: '' // used as content of the 'twitter:creator' meta tag
};

module.exports = config;
