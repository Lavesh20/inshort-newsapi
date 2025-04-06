export default function AboutUs() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 bg-white text-gray-800 mt-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">About Us</h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
  
        <div className="space-y-6 mb-12">
          <p className="text-lg leading-relaxed">
            At Ticker Shorts, we transform the way you experience financial markets. More than just numbers, we capture
            the essence of dreams, ambitions, and real-world opportunities. Our mission is to deliver concise, timely, and
            reliable market insights that resonate with your aspirations—and even your fear of missing out.
          </p>
  
          <div className="grid md:grid-cols-2 gap-8 my-10">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  40%
                </div>
                <h3 className="ml-4 text-xl font-semibold text-blue-800">Trust</h3>
              </div>
              <p>
                We believe that trust is the ultimate currency. Our success comes from earning your unwavering trust
                through our commitment to impeccable accuracy and integrity.
              </p>
            </div>
  
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  30%
                </div>
                <h3 className="ml-4 text-xl font-semibold text-blue-800">Understanding</h3>
              </div>
              <p>
                Our relentless pursuit of understanding your unique financial journey, whether you're a visionary just
                starting out, a seasoned professional safeguarding your legacy, or someone determined to build a brighter
                future.
              </p>
            </div>
  
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  20%
                </div>
                <h3 className="ml-4 text-xl font-semibold text-blue-800">Clarity</h3>
              </div>
              <p>
                Our platform is meticulously designed to distill complex market trends into beautifully simple
                insights—this clarity is at the heart of our approach.
              </p>
            </div>
  
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  10%
                </div>
                <h3 className="ml-4 text-xl font-semibold text-blue-800">Feedback</h3>
              </div>
              <p>
                We're always listening: our energy is devoted to refining our service through your invaluable feedback,
                ensuring you feel supported every step of the way.
              </p>
            </div>
          </div>
  
          <p className="text-lg leading-relaxed">
            Ticker Shorts isn't just another news service—it's your trusted partner in empowering you with knowledge that
            inspires confidence, ignites ambition, and guides you toward smarter financial decisions. Whether you're
            chasing the dream of financial freedom or protecting your hard-earned assets, we're here to help you navigate
            the dynamic world of finance with clarity and purpose.
          </p>
        </div>
  
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900">Disclaimer</h2>
          <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
            The content in our posts and articles is provided solely for informational and educational purposes and should
            not be considered professional financial advice. For personalized investment or tax advice, please consult a
            qualified financial or tax advisor. Opinions, analysis, and commentary on our platform are subject to change
            without notice due to evolving market conditions and other factors. Additionally, any engagement with
            third-party websites or services linked on our platform is at your sole discretion and risk.
          </p>
        </div>
      </div>
    )
  }
  
  