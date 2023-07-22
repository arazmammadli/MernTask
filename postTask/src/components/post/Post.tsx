import { useRef } from "react"
import Header from './Header'
import Image from './Image'
import Actions from './Actions'
import Footer from './Footer'
import Comments from './Comments'
import { SetPostType } from "../../utils"
import { IComment } from "../../types"

type IPostProps = {
  setData: SetPostType;
  id: number;
  istifadeciAdi: string;
  profilSekli: string;
  beyenmeler: number;
  beyenilibMi: boolean;
  seyranlar: number;
  terkib:string;
  comments: IComment[]
}

export default function Post({ istifadeciAdi, terkib,comments, profilSekli, beyenmeler, beyenilibMi, seyranlar, setData, id }: IPostProps) {

  const commentInput = useRef<HTMLInputElement>(null);
  return (
    <div className=' rounded border bg-white border-gray-primary mb-12'>
      <Header istifadeciAdi={istifadeciAdi} />
      <Image src={`/images/${profilSekli}`} />
      <Actions dataSet={setData} id={id} totalLikes={beyenmeler} likedPhoto={beyenilibMi} />
      <div className="px-4 pt-2 pb-1">
        <span className="mr-1 text-base font-bold">{istifadeciAdi}</span>
        <span className="text-base">{terkib}</span>
      </div>
      <Comments dataSet={setData} id={id} comments={comments} commentInput={commentInput} />
      <Footer beyenilibMi={beyenilibMi} seyranlar={seyranlar} />
    </div>
  )
}