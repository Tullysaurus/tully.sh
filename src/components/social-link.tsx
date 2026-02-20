export default function SocialLink({ href, icon, ...props}: { href: string; icon: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" {...props} className="w-fit h-fit">
            {icon}
        </a>
    )
}