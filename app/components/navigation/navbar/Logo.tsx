import Image from 'next/legacy/image'


const Logo = () => {
    return (
        <Image
            src="/nextjs.svg"
            width={100}
            height={100}
        />
    )
}

export default Logo