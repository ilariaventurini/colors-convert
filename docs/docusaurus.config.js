module.exports = {
  title: 'Colors convert',
  tagline: 'A simple color library',
  url: 'https://github.com/ilariaventurini/', // URL for your website. This can also be considered the top-level hostname
  baseUrl: '/', // Base URL for your site. This can also be considered the path after the host
  onBrokenLinks: 'throw', // The behavior of Docusaurus, when it detects any broken link
  onDuplicateRoutes: 'throw', // The behavior of Docusaurus when it detects any duplicate routes
  favicon: 'img/favicon.ico', // URL for site favicon
  organizationName: 'ilariaventurini', // Usually your GitHub org/user name
  projectName: 'colors-convert', // Usually your repo name
  // An object containing data needed by the theme you use
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
      switchConfig: {
        darkIcon: '🌙',
        lightIcon: '\u2600',
        // React inline style object
        // see https://reactjs.org/docs/dom-elements.html#style
        darkIconStyle: {
          marginLeft: '2px',
        },
        lightIconStyle: {
          marginLeft: '1px',
        },
      },
    },
    navbar: {
      title: 'Colors convert',
      logo: {
        alt: 'Color convert logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/ilariaventurini/colors-convert',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ilariaventurini/colors-convert',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ilaria Venturini, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/ilariaventurini/colors-convert/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
