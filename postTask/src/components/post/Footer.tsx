
const Footer = ({ beyenilibMi, seyranlar }: { beyenilibMi: boolean, seyranlar: number }) => {
    return (
        <div className="px-4 pt-2 pb-1 flex justify-between">
            <span className="mr-1 text-base"><strong>Paylaşım sayısı:</strong> {seyranlar}</span>
            <span className="text-base"><strong>beyenilibMi</strong>:{beyenilibMi ? "True" : "False"}</span>
        </div>
    )
};

export default Footer;