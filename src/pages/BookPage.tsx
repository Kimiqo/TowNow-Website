import { motion } from 'framer-motion'
import WebBookingWidget from '../components/WebBookingWidget'

export default function BookPage() {
  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-start overflow-hidden pt-20 pb-10">
      
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://maps.google.com/maps?q=Accra,%20Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="pointer-events-none sm:pointer-events-auto filter grayscale-[0.3]"
        ></iframe>
      </div>

      {/* Booking Widget Container */}
      <div className="relative z-10 w-full px-4 md:w-1/2 md:pl-16 lg:pl-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <WebBookingWidget />
        </motion.div>
      </div>

    </div>
  )
}
