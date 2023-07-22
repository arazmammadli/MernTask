import { useState } from "react"
import './App.css'
import Post from './components/post/Post'
import { IPost } from './types'

function App() {
  const [data,setData] = useState<IPost[]>([
    {
      id: 1,
      istifadeciAdi: 'john_doe',
      profilSekli: 'profil1.jpg',
      tarix: '2023-07-20',
      terkib: 'Bu gün mütləq bir gün!',
      beyenmeler: 10,
      seyranlar: 5,
      comments: [],
      beyenilibMi: false,
    },
    {
      id: 2,
      istifadeciAdi: 'jane_smith',
      profilSekli: 'profil2.jpg',
      tarix: '2023-07-19',
      terkib: 'Yeni layihə üzərində çalışıram.',
      beyenmeler: 25,
      seyranlar: 12,
      comments: [],
      beyenilibMi: true,
    },
  ])

  return (
    <div className='w-full min-h-screen'>
      {
        data.map((w) => {
          return (
            <Post key={w.id} {...w} setData={setData} />
          )
        })
      }
    </div>
  )
}

export default App
