type IconCardItem = { icon?: string; title: React.ReactNode; text: React.ReactNode };

export default function IconCardGrid({ items }: { title?: string; subtitle?: string; items: IconCardItem[] }) {
    return (
      <section className="">
  
  
       
          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
  
            {items.map((item: IconCardItem, index: number) => (
              <div
                key={index}
                className="bg-white p-14 md:p-8 md:text-left text-center rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
  
                <div
                  className={`w-12 h-12 mb-5 mb-5 md:ml-0 mx-auto feature-icon bg-center bg-no-repeat bg-contain ${item.icon}`}
                  style={{
                    backgroundImage: "url('/uploads/landing/feature.svg')"
                  }}
                />
  
                <h3 className="font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
  
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.text}
                </p>
  
              </div>
            ))}
  
          </div>
  
      
  
      </section>
    )
  }