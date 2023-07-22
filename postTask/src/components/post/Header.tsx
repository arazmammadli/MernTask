
const Header = ({istifadeciAdi}:{istifadeciAdi:string}) => {
  return (
    <div className="block border-b border-[#dbdbdb] min-h-4 px-2 py-4">
        <div className="flex flex-row gap-3 items-center">
            <div className="w-10 h-10 rounded-[50%] bg-cyan-600 flex justify-center items-center">
                <span>{istifadeciAdi.charAt(0)}</span>
            </div>
            <p className="font-bold">{istifadeciAdi}</p>
        </div>
    </div>
  )
};

export default Header;