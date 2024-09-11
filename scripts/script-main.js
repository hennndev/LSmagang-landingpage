const header = document.querySelector('.header')
const navLinks = document.querySelector('.header .nav-links')
const menuIcon = document.querySelector('.menu-icon')

const articles = document.querySelector('.article-cards')
const categories = document.querySelectorAll('.category')

let scrollY = 0
let isScrolled = false


document.addEventListener('DOMContentLoaded', () => {
    handleHeader()
    handleArticles()
})


// HEADER
const handleHeader = () => {
    window.addEventListener('scroll', () => {
        if(window.scrollY > scrollY) {
            isScrolled = true
        } else {
            isScrolled = false
        }
        scrollY = window.scrollY
        showHideHeader()
    })
    if(isScrolled) {
        header.classList.add("header-hidden")
    }

    menuIcon.addEventListener('click', () => {
        if(navLinks.classList.contains('show-nav')) {
            navLinks.classList.remove('show-nav')
            menuIcon.classList.add('icon-light')
            menuIcon.classList.remove('icon-dark')
        } else {
            navLinks.classList.add('show-nav')
            menuIcon.classList.add('icon-dark')
            menuIcon.classList.remove('icon-light')
        }
    })
}
// ARTICLES
const handleArticles = () => {
    const pathname = window.location.pathname.split('/').reverse()[0]
    if(pathname === 'articles.html') {
        displayArticles()
        handleCategories()
    }
}
const handleCategories = () => {
    categories.forEach(cty => {
        cty.addEventListener('click', () => {
            changeParams('category', cty.innerHTML === 'All Category' ? '' : cty.innerHTML)
            displayArticles()
            handleActiveCategory()
        })
    })
}
const handleActiveCategory = () => {
    const params = getParams()
    categories.forEach(cty => {
        if(params.get('category') && params.get('category') === cty.innerHTML) {
            cty.classList.add('active')
        } else if(!params.get('category') && cty.innerHTML === 'All Category') {
            cty.classList.add('active')
        } else  {
            cty.classList.remove('active')
        }
    })
}




// UTILS FUNCTION
function showHideHeader() {
    if(isScrolled) {
        header.classList.add('header-hidden')
    } else {
        if(scrollY > 0) {
            header.classList.add('header-shadow')
            header.classList.remove('header-hidden')
        } else {
            if(header.classList.contains('header-shadow')) {
                header.classList.remove('header-shadow')
            }
            header.classList.remove('header-hidden')
        }
    }
}
function displayArticles() {
    const params = getParams()
    let articlesEle = ""
    articlesData.filter(obj => {
        if(params.get('category')) {
            return obj.category === params.get('category')
        } else {
            return obj
        }
    }).forEach(obj => (
        articlesEle += `
            <article class="article-card">
                <section class="img-container">
                    <img src=${obj.imageURL} loading="lazy" alt=${obj.title}>
                </section>

                <section class="text-container">
                    <p>${obj.date}</p>
                    <h3>${obj.title}</h3>
                    <p>${obj.description}</p>
                    <a href="${obj.linkURL}" target="_blank">Read More</a>
                </section>
            </article>
        `
    ))
    articles.innerHTML = articlesEle
}
function getParams() {
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search)
    return params
}
function changeParams(key, value) {
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search)
    if(value === '' || value === undefined) {
        params.delete(key)
    } else {
        params.set(key, value)
    }
    console.log(params.size)
    window.history.pushState({}, '', `${url.pathname}${params.size < 1 ? '' : '?'}${params}`)
}








const articlesData = [
    {
        id: 1,
        title: 'Survei Inovasi AIBP 2024: 63% Bisnis Indonesia Tengah Mengembangkan Strategi yang Berfokus Pada AI',
        imageURL: 'https://media.suara.com/pictures/653x366/2024/09/02/49011-aibp.webp',
        date: 'Senin, 02 September 2024',
        description: 'Sebagai bagian dari ASEAN Innovation Business Platform (AIBP) Conference & Exhibition, 15 perusahaan startup terkemuka dari Taiwan, yang dipilih melalui "Program Insentif DIGITAL+ untuk Startup Digital" Ministry of Digital Affairs (MODA), bertemu dengan berbagai lembaga dan perusahaan terdepan di Indonesia untuk menjajaki kemitraan dan kolaborasi yang dapat berkontribusi pada terwujudnya ekonomi digital Indonesia.',
        category: 'Artificial Intelligence',
        linkURL: 'https://www.suara.com/bisnis/2024/09/02/075152/survei-inovasi-aibp-2024-63-bisnis-indonesia-tengah-mengembangkan-strategi-yang-berfokus-pada-ai'
    },
    {
        id: 2,
        title: 'Why React Native App Development Is Gaining Huge Boom in 2024?',
        imageURL: 'https://dailytrust.com/wp-content/uploads/2024/05/react-native-app-development.jpeg',
        date: 'Senin, 02 September 2024',
        description: 'Cross platform technologies have been widely in use for a very long time. App developers are now aware of the fact that they can save up time and efforts both using modernized technologies. ',
        category: 'Technology',
        linkURL: 'https://dailytrust.com/why-react-native-app-development-is-gaining-huge-boom-in-2024/'
    },
    {
        id: 3,
        title: 'MERN vs MEAN Stack: Which Stack Reigns Supreme in 2024?',
        imageURL: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/mern_stackmean_stack.jpg',
        date: 'Senin, 02 September 2024',
        description: 'Web development is constantly on the move, and to build efficient, scalable and robust applications, choosing the appropriate technology stack can make all the difference. In 2024, two significant stacks are at the top of their game: MERN and MEAN. Both acronyms combine potent tools, but which genuinely reigns supreme this year? Knowing the strengths and weaknesses of each stack is, therefore, very important, whether one is a seasoned developer or a newcomer in the journey.',
        category: 'Technology',
        linkURL: 'https://www.simplilearn.com/mern-vs-mean-stack-article'
    },
    {
        id: 4,
        title: '5 React Architecture Best Practices for 2024',
        imageURL: 'https://uploads.sitepoint.com/wp-content/uploads/2018/04/1619743379react-architecture.png',
        date: 'Senin, 02 September 2024',
        description: 'However, as React only takes care of the view layer of an application, it doesn’t enforce any specific architecture (such as MVC or MVVM). This can make it difficult to keep your codebase organized as your React project grows.',
        category: 'Technology',
        linkURL: 'https://www.sitepoint.com/react-architecture-best-practices/'
    },
    {
        id: 5,
        title: 'Dukung Coinfest 2024, Upbit Soroti Inovasi Blockchain di Indonesia dan Asia',
        imageURL: 'https://tabloidpulsa.id/wp-content/uploads/2024/09/CoinFest-2024-Upbit-768x432.webp',
        date: 'Senin, 02 September 2024',
        description: 'Upbit Indonesia mengumumkan partisipasinya sebagai sponsor dalam side event Coinfest 2024 yang digelar oleh Asosiasi Blockchain dan Pedagang Aset Kripto Indonesia (ABI-Aspakrindo) yaitu Indonesia Blockchain Conference (IBC).',
        category: 'Blockchain',
        linkURL: 'https://tabloidpulsa.id/dukung-coinfest-2024-upbit-soroti-inovasi-blockchain-di-indonesia-dan-asia/'
    },
    {
        id: 6,
        title: 'Indonesia Jadi Target Utama HAQQ Network dengan Blockchain Halal',
        imageURL: 'https://cdn.langit7.id/foto/850/langit7/berita/2024/09/02/1/38407/indonesia-jadi-target-utama-haqq-network-dengan-blockchain-halal-rrg.jpg',
        date: 'Senin, 02 September 2024',
        description: 'LANGIT7.ID-, Jakarta- - Di tengah meningkatnya perdebatan mengenai kepatuhan syariah dalam dunia kripto, HAQQ Network muncul dengan solusi baru yang inklusif dan sesuai prinsip Islam. Sembilan bulan setelah peluncuran mainnet, platform blockchain ini telah berhasil menarik perhatian dengan berbagai pencapaian, termasuk 1,4 juta instalasi aplikasi Haqq Wallet di perangkat iOS dan Android.',
        category: 'Blockchain',
        linkURL: 'https://langit7.id/read/38407/1/indonesia-jadi-target-utama-haqq-network-dengan-blockchain-halal-1725268170'
    },
    {
        id: 7,
        title: 'Ditjen Aptika Kemkominfo siap mendukung Pengembangan Ekosistem Blockchain di Indonesia',
        imageURL: 'https://aptika.kominfo.go.id/wp-content/uploads/2024/02/thumbs-678x381.jpg',
        date: 'Senin, 02 September 2024',
        description: 'Jakarta, 21 Februari 2024 – Untuk mendorong penciptaan ekonomi digital yang terus maju dan inklusif, Kominfo secara terstruktur menyediakan berbagai kebijakan dalam penciptaan dan peningkatan kemajuan ekosistem digital. Untuk itu, Kominfo (Ditjen Aptika) terus berupaya melakukan sinergi dengan para pelaku industri melalaui penandatanganan kerjasama (PKS) pada tanggal 17 Januari 2024 bersama dengan Asosiasi Blockchain Indonesia (A-B-I) guna pengembangan industri Blockchain yang diwujudkan dengan penyusunan peta ekosistem industri Blockchain di Indonesia.',
        category: 'Blockchain',
        linkURL: 'https://aptika.kominfo.go.id/2024/02/ditjen-aptika-kemkominfo-siap-mendukung-pengembangan-ekosistem-blockchain-di-indonesia/'
    },
]
