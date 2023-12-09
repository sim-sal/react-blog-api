import style from "../css/modules/Header.module.css"

const links = [
    {
        label: 'Home',
        url: '#'
    },
    {
        label: 'Post',
        url: '#'
    },
    {
        label: 'Chi Sono',
        url: '#'
    },
    {
        label: 'Contatti',
        url: '#'
    },
];

export default function Header() {
    return (
        <header className={style.header}>
            <div className={style.logo_title}>
                <h1>Un blog spaziale</h1>
                <img src="/logo.svg" alt="" />
            </div>

            <div>
                <ul className={style.navList}>
                    {links.map((link, i) => (
                        <li key={i}>
                            <a href={link.url}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}