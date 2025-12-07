import Link from "next/link";

const { Play } = require("lucide-react");
const { default: Image } = require("next/image");

const VideoCard = ({ title, description, created_at, image_url, slug }) => (
  <Link href={`/news/${slug}`} className='flex flex-row border-b border-gray-200 py-2 gap-3 hover:bg-gray-50'>
    <div className='relative rounded-md overflow-hidden shrink-0 w-[158px] h-[90px] group'>
      <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
        <Image
          width={100}
          height={100}
          src={`http://localhost:8000/media/${image_url}`}
          alt={title}
          className='w-full h-full object-cover'
          unoptimized
        />
      </div>
      <Play
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-90'
        fill='white'
      />
    </div>
    <div className='flex gap-y-1 flex-col flex-1'>
      <div className='line-clamp-2 font-semibold text-sm text-gray-900'>
        {title}
      </div>
      <div className='text-gray-500 line-clamp-2 text-xs'>{description}</div>
      <div className='text-xs text-gray-500 hidden xs:block'>{created_at}</div>
    </div>
  </Link>
)

export default VideoCard;