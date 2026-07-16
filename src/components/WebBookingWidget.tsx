import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CAR_TYPES = [
  { id: 'sedan', name: 'Sedan', icon: '🚗', baseFare: 150 },
  { id: 'suv', name: 'SUV', icon: '🚙', baseFare: 200 },
  { id: 'van', name: 'Van', icon: '🚐', baseFare: 220 },
  { id: 'truck', name: 'Truck', icon: '🚚', baseFare: 250 },
  { id: 'motorcycle', name: 'Motorcycle', icon: '🏍', baseFare: 100 },
  { id: 'luxury', name: 'Luxury', icon: '🚘', baseFare: 350 },
]

const EMERGENCY_TYPES = [
  { id: 'flat_tire', name: 'Flat Tire', icon: '🔘' },
  { id: 'dead_battery', name: 'Dead Battery', icon: '🔋' },
  { id: 'out_of_gas', name: 'Out of Gas', icon: '⛽️' },
  { id: 'accident', name: 'Accident', icon: '⚠️' },
  { id: 'engine_trouble', name: 'Engine Trouble', icon: '⚙️' },
]

export default function WebBookingWidget() {
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  // State
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [carType, setCarType] = useState(CAR_TYPES[0].id)
  const [emergencyType, setEmergencyType] = useState(EMERGENCY_TYPES[0].id)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')

  const getSelectedCar = () => CAR_TYPES.find(c => c.id === carType)!
  const getSelectedEmergency = () => EMERGENCY_TYPES.find(e => e.id === emergencyType)!

  // Simulated API call helper
  const simulateApiCall = async (delayMs: number, nextStep: number) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    setIsLoading(false)
    setStep(nextStep)
  }

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pickup || !dropoff) return
    simulateApiCall(800, 1)
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    simulateApiCall(800, 2)
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return
    // Here we would call the Moolre SMS API
    simulateApiCall(1200, 3)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return
    simulateApiCall(1200, 4)
  }

  const handleConfirmationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    simulateApiCall(2000, 5) // Finding a driver delay
  }

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  }

  return (
    <div className="relative w-full max-w-[420px] overflow-hidden rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] sm:p-8 text-black border border-gray-100 z-20">
      <div className="relative h-[480px]"> {/* Increased height for new steps */}
        <AnimatePresence custom={1} mode="wait">
          
          {/* STEP 0: LOCATION */}
          {step === 0 && (
            <motion.form 
              key="step0"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleLocationSubmit}
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
                {isLoading ? <Spinner dark={false} /> : 'Continue'}
              </button>
            </motion.form>
          )}

          {/* STEP 1: RIDE DETAILS (Emergency & Vehicle Type) */}
          {step === 1 && (
            <motion.form 
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleDetailsSubmit}
              className="absolute inset-0 flex flex-col overflow-y-auto pr-1 -mr-1"
            >
              <div className="mb-4">
                <h2 className="text-[28px] font-bold tracking-tight">Ride Details</h2>
                <p className="text-sm text-gray-500 mt-1">Help us send the right truck.</p>
              </div>
              
              <div className="flex-1 space-y-6">
                
                {/* Emergency Types */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Emergency</h3>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                    {EMERGENCY_TYPES.map(em => (
                      <button
                        key={em.id}
                        type="button"
                        onClick={() => setEmergencyType(em.id)}
                        className={`flex flex-col items-center justify-center min-w-[90px] p-3 rounded-xl border-2 transition-all ${
                          emergencyType === em.id ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-2xl mb-1">{em.icon}</span>
                        <span className="text-[10px] font-semibold text-center leading-tight">{em.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Types */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Vehicle Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {CAR_TYPES.map(car => (
                      <button
                        key={car.id}
                        type="button"
                        onClick={() => setCarType(car.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                          carType === car.id ? 'border-black bg-white shadow-sm' : 'border-transparent bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-2xl">{car.icon}</span>
                        <div className="text-left">
                          <span className="block text-sm font-bold text-gray-900">{car.name}</span>
                          <span className="block text-xs text-gray-500">Est. GHS {car.baseFare}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-4 font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-70 flex-shrink-0"
              >
                {isLoading ? <Spinner dark={false} /> : 'Continue'}
              </button>
            </motion.form>
          )}

          {/* STEP 2: AUTH (PHONE) */}
          {step === 2 && (
            <motion.form 
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handlePhoneSubmit}
              className="absolute inset-0 flex flex-col"
            >
              <div className="mb-6">
                <h2 className="text-[28px] font-bold tracking-tight">Login</h2>
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
                {isLoading ? <Spinner dark={false} /> : 'Send Code'}
              </button>
            </motion.form>
          )}

          {/* STEP 3: OTP VERIFICATION */}
          {step === 3 && (
            <motion.form 
              key="step3"
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

          {/* STEP 4: ORDER CONFIRMATION */}
          {step === 4 && (
            <motion.form 
              key="step4"
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleConfirmationSubmit}
              className="absolute inset-0 flex flex-col"
            >
              <div className="mb-4">
                <h2 className="text-[28px] font-bold tracking-tight">Confirm Request</h2>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="rounded-xl bg-gray-50 p-5 border border-gray-100">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500">Pick-up</span>
                    <span className="text-black font-semibold truncate max-w-[150px]">{pickup}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500">Drop-off</span>
                    <span className="text-black font-semibold truncate max-w-[150px]">{dropoff}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500">Emergency</span>
                    <span className="text-black font-semibold flex items-center gap-2">
                      {getSelectedEmergency().icon} {getSelectedEmergency().name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-500">Vehicle</span>
                    <span className="text-black font-semibold flex items-center gap-2">
                      {getSelectedCar().icon} {getSelectedCar().name}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                    <div>
                      <span className="block text-xs text-gray-500 font-medium">Est. Base Fare</span>
                      <span className="block text-2xl font-bold text-black mt-1">GHS {getSelectedCar().baseFare}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#E85D31]/10 rounded-xl p-4 flex gap-3 items-start border border-[#E85D31]/20">
                  <span className="text-lg">💳</span>
                  <p className="text-[13px] text-[#D84C20] font-medium leading-relaxed">
                    Payment is collected seamlessly via the app or your driver after your tow concludes.
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-4 font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-70 flex-shrink-0"
              >
                {isLoading ? <Spinner dark={false} /> : 'Request Tow Now'}
              </button>
            </motion.form>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <motion.div 
              key="step5"
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
