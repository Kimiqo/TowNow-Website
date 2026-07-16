import type { ReactNode } from 'react'

export default function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] aspect-[9/19.5]">
      {/* Outer Case */}
      <div className="absolute inset-0 rounded-[3rem] bg-[#1a1a1a] shadow-[0_0_0_2px_#333,0_0_0_8px_#111,0_20px_40px_rgba(0,0,0,0.4)] pointer-events-none z-10 border border-[#333]">
        {/* Dynamic Island (Notch) */}
        <div className="absolute left-1/2 top-3 h-[25px] w-[90px] -translate-x-1/2 rounded-full bg-black flex justify-between items-center px-2">
          {/* Camera lens reflection */}
          <div className="w-[12px] h-[12px] rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
          {/* Sensor */}
          <div className="w-[6px] h-[6px] rounded-full bg-[#111] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] mr-1"></div>
        </div>
        
        {/* Power Button */}
        <div className="absolute -right-[11px] top-[140px] h-[60px] w-[3px] rounded-r-md bg-[#222]"></div>
        
        {/* Volume Buttons */}
        <div className="absolute -left-[11px] top-[120px] h-[50px] w-[3px] rounded-l-md bg-[#222]"></div>
        <div className="absolute -left-[11px] top-[180px] h-[50px] w-[3px] rounded-l-md bg-[#222]"></div>
      </div>

      {/* Screen area */}
      <div className="absolute inset-[10px] rounded-[2.5rem] bg-black overflow-hidden z-0">
        {children}
      </div>
    </div>
  )
}
