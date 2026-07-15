import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans pt-20">
      
      {/* Top Section: Header */}
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Log in to access<br />your account
          </h1>
        </div>
        
        {/* Placeholder Graphic mimicking Uber's SVG style */}
        <div className="w-full md:w-1/2 flex justify-end">
          <div className="relative w-full max-w-[500px] h-[200px] bg-[#E85D31] rounded-t-full overflow-hidden flex items-end justify-center">
            {/* Simple CSS illustration of Rider & Driver */}
            <div className="flex gap-8 px-8 w-full justify-between items-end pb-0">
              {/* Rider */}
              <div className="w-24 h-32 bg-white rounded-t-full relative flex flex-col items-center">
                <div className="w-12 h-12 bg-black rounded-full absolute -top-6"></div>
                <div className="w-4 h-24 bg-gray-200 absolute rotate-45 top-8"></div>
              </div>
              {/* Driver with Steering Wheel */}
              <div className="w-32 h-36 bg-black rounded-t-full relative flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-full absolute -top-7"></div>
                <div className="w-4 h-24 bg-gray-800 absolute -rotate-45 top-8"></div>
                {/* Steering Wheel */}
                <div className="w-24 h-12 border-[8px] border-white rounded-t-full absolute bottom-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Split Selection */}
      <div className="w-full bg-black text-white min-h-[50vh] px-6 py-24">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-16 md:gap-8">
          
          {/* Rider Link */}
          <Link 
            to="/" 
            className="group flex-1 border-b border-gray-800 pb-8 flex items-center justify-between hover:border-white transition-colors"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Rider</h2>
            <svg 
              width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" 
              className="transition-transform group-hover:translate-x-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          {/* Driver Link */}
          <Link 
            to="/" 
            className="group flex-1 border-b border-gray-800 pb-8 flex items-center justify-between hover:border-white transition-colors"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Driver</h2>
            <svg 
              width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" 
              className="transition-transform group-hover:translate-x-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

        </div>
      </div>
    </div>
  )
}
