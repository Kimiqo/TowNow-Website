import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WebBookingWidget() {
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [network, setNetwork] = useState('MTN')

  // Simulated API call helper
  const simulateApiCall = async (delayMs: number, nextStep: number) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    setIsLoading(false)
    setStep(nextStep)
  }

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pickup || !dropoff) return
    simulateApiCall(1200, 1)
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return
    simulateApiCall(1500, 2)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return
    simulateApiCall(1500, 3)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    simulateApiCall(3000, 4) // Longer delay to simulate USSD/Mobile Money prompt
  }

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  }

  return (
    <div className="relative w-full max-w-[420px] overflow-hidden rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] sm:p-8 text-black border border-gray-100 z-20">
      <div className="relative h-[400px]">
        <AnimatePresence custom={1} mode="wait">
          
          {/* STEP 0: LOCATION & QUOTE */}
          {step === 0 && (
            <motion.form 
              key="step0"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleQuoteSubmit}
              className="absolute inset-0 flex flex-col"
            >
              <div className="mb-6">
                <h2 className="text-[28px] font-bold tracking-tight">Find a tow</h2>
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black"></div>
                  <input 
                    type="text" 
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pick-up location" 
                    className="w-full rounded-xl bg-gray-100 px-10 py-4 text-black placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black"></div>
                  <input 
                    type="text" 
                    required
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Drop-off location" 
                    className="w-full rounded-xl bg-gray-100 px-10 py-4 text-black placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-4 font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-70"
              >
                {isLoading ? <Spinner dark={false} /> : 'Search'}
              </button>
            </motion.form>
          )}

          {/* STEP 1: AUTH (PHONE) */}
          {step === 1 && (
            <motion.form 
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handlePhoneSubmit}
              className="absolute inset-0 flex flex-col"
            >
              <div className="mb-6">
                <h2 className="text-[28px] font-bold tracking-tight">GHS 350.00</h2>
                <p className="text-sm text-gray-500 mt-1 font-medium">Flat fare guaranteed.</p>
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-4">Enter your phone number to login or sign up.</p>
                <div>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center rounded-xl bg-gray-100 px-4 text-black font-medium">
                      +233
                    </div>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="54 123 4567" 
                      className="w-full rounded-xl bg-gray-100 px-4 py-4 text-black placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-4 font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-70"
              >
                {isLoading ? <Spinner dark={false} /> : 'Continue'}
              </button>
            </motion.form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 2 && (
            <motion.form 
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleOtpSubmit}
              className="absolute inset-0 flex flex-col"
            >
              <div className="mb-6">
                <h2 className="text-[28px] font-bold tracking-tight">Enter code</h2>
                <p className="text-sm text-gray-500 mt-1">We sent a 6-digit code to +233 {phone}</p>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="• • • • • •" 
                  className="w-full rounded-xl bg-gray-100 px-4 py-6 text-center text-3xl tracking-[0.5em] text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-4 font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-70"
              >
                {isLoading ? <Spinner dark={false} /> : 'Verify'}
              </button>
            </motion.form>
          )}

          {/* STEP 3: MOOLRE CHECKOUT */}
          {step === 3 && (
            <motion.form 
              key="step3"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handlePaymentSubmit}
              className="absolute inset-0 flex flex-col"
            >
              <div className="mb-6">
                <h2 className="text-[28px] font-bold tracking-tight">Checkout</h2>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex gap-2 p-1 rounded-xl bg-gray-100">
                  {['MTN', 'Telecel', 'AirtelTigo'].map(net => (
                    <button
                      key={net}
                      type="button"
                      onClick={() => setNetwork(net)}
                      className={`flex-1 rounded-lg py-3 text-sm font-semibold transition-colors cursor-interactive ${network === net ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                    >
                      {net}
                    </button>
                  ))}
                </div>

                <div className="rounded-xl bg-gray-50 p-5 border border-gray-100">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-600">Tow Service</span>
                    <span className="text-black font-medium">GHS 350.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Network Fee</span>
                    <span className="text-black font-medium">GHS 0.00</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold text-lg">
                    <span className="text-black">Total</span>
                    <span className="text-black">GHS 350.00</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-4 font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-70"
              >
                {isLoading ? 'Awaiting Prompt...' : 'Confirm Request'}
              </button>
            </motion.form>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <motion.div 
              key="step4"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-green-600">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="text-[28px] font-bold text-black mb-2">Finding a driver...</h2>
              <p className="text-sm text-gray-500 mb-8 max-w-[250px]">
                We are connecting you to a nearby truck. Check your phone for live tracking.
              </p>

              <button 
                onClick={() => setStep(0)}
                className="flex w-full items-center justify-center rounded-xl bg-gray-100 py-4 font-semibold text-black transition-all hover:bg-gray-200"
              >
                Book another
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

function Spinner({ dark = false }: { dark?: boolean }) {
  return (
    <svg className={`h-5 w-5 animate-spin ${dark ? 'text-black' : 'text-white'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}
