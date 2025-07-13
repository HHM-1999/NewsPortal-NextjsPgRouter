
import { useRouter } from 'next/navigation';

const ScrollLink = ({ href, children, ...props }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <a href={href} onClick={handleClick} {...props}>
            {children}
        </a>
    );
};

export default ScrollLink;
