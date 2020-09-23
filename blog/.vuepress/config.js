module.exports = {
    title: "Zemian's Blog",
    description: "Writing on software development",

    plugins: [
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-135626598-1'
            }
        ]
    ],

    theme: '@vuepress/blog',
    themeConfig: {
        directories: [
            {
                id: 'post',
                dirname: '_posts',
                path: '/',
            },
        ],
        nav: [
            {
                text: 'Blog',
                link: '/',
            },
            {
                text: 'Tags',
                link: '/tag/',
            },
            {
                text: 'About',
                link: '/about-zemian',
            }
        ],
        dateFormat: 'dddd, MMMM D, YYYY',
        globalPagination: {
            lengthPerPage: 10
        },
        sitemap: {
            hostname: 'https://zemian.github.io'
        },
        footer: {
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/zemian',
                }
            ],
            copyright: [
                {
                    text: 'Copyright © 2011-present Zemian Deng',
                    link: '/about-zemian',
                }
            ],
        }
    },

    markdown: {
        linkify: true
    }
}
